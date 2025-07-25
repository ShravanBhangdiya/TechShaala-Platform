import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { useCart } from "@/context/cart-context";
import {
  checkCoursePurchaseInfoService,
  createPaymentService,
  fetchStudentViewCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle, Heart, ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const { auth } = useContext(AuthContext);
  const { addToWishlist, removeFromWishlist, addToCart, isInWishlist, isInCart } = useCart();

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails() {
    // const checkCoursePurchaseInfoResponse =
    //   await checkCoursePurchaseInfoService(
    //     currentCourseDetailsId,
    //     auth?.user._id
    //   );

    // if (
    //   checkCoursePurchaseInfoResponse?.success &&
    //   checkCoursePurchaseInfoResponse?.data
    // ) {
    //   navigate(`/course-progress/${currentCourseDetailsId}`);
    //   return;
    // }

    const response = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsId
    );

    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    console.log(getCurrentVideoInfo);
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  async function handleCreatePayment() {
    const paymentPayload = {
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentId: "",
      payerId: "",
      instructorId: studentViewCourseDetails?.instructorId,
      instructorName: studentViewCourseDetails?.instructorName,
      courseImage: studentViewCourseDetails?.image,
      courseTitle: studentViewCourseDetails?.title,
      courseId: studentViewCourseDetails?._id,
      coursePricing: studentViewCourseDetails?.pricing,
    };

    console.log(paymentPayload, "paymentPayload");
    const response = await createPaymentService(paymentPayload);

    if (response.success) {
      sessionStorage.setItem(
        "currentOrderId",
        JSON.stringify(response?.data?.orderId)
      );
      setApprovalUrl(response?.data?.approveUrl);
    }
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes("course/details"))
      setStudentViewCourseDetails(null),
        setCurrentCourseDetailsId(null),
        setCoursePurchaseId(null);
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  if (approvalUrl !== "") {
    window.location.href = approvalUrl;
  }

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-8 rounded-t-xl shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              <h1 className="text-4xl font-bold mb-4">
                {studentViewCourseDetails?.title}
              </h1>
              <p className="text-xl mb-6 text-blue-100">
                {studentViewCourseDetails?.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-6 mt-4 text-sm">
                <span className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <span className="mr-2">👨‍🏫</span>
                  {studentViewCourseDetails?.instructorName}
                </span>
                <span className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <span className="mr-2">📅</span>
                  {studentViewCourseDetails?.date.split("T")[0]}
                </span>
                <span className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Globe className="mr-2 h-4 w-4" />
                  {studentViewCourseDetails?.primaryLanguage}
                </span>
                <span className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <span className="mr-2">👥</span>
                  {studentViewCourseDetails?.students.length}{" "}
                  {studentViewCourseDetails?.students.length <= 1
                    ? "Student"
                    : "Students"}
                </span>
              </div>
            </div>
            <div className="lg:w-80">
              <img 
                src={studentViewCourseDetails?.image} 
                alt={studentViewCourseDetails?.title}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <main className="flex-grow">
            <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentViewCourseDetails?.objectives
                    .split(",")
                    .map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-3 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{objective.trim()}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{studentViewCourseDetails?.description}</p>
              </CardContent>
            </Card>
            
            <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {studentViewCourseDetails?.curriculum?.map(
                    (curriculumItem, index) => (
                      <li
                        key={index}
                        className={`${
                          curriculumItem?.freePreview
                            ? "cursor-pointer hover:bg-blue-50"
                            : "cursor-not-allowed opacity-60"
                        } flex items-center p-3 rounded-lg transition-all duration-200`}
                        onClick={
                          curriculumItem?.freePreview
                            ? () => handleSetFreePreview(curriculumItem)
                            : null
                        }
                      >
                        {curriculumItem?.freePreview ? (
                          <PlayCircle className="mr-3 h-5 w-5 text-blue-500" />
                        ) : (
                          <Lock className="mr-3 h-5 w-5 text-gray-400" />
                        )}
                        <span className="text-gray-700 font-medium">{curriculumItem?.title}</span>
                        {curriculumItem?.freePreview && (
                          <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Free Preview
                          </span>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </main>
          
          <aside className="w-full md:w-[400px]">
            <Card className="sticky top-4 bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-6">
                <div className="aspect-video mb-6 rounded-xl overflow-hidden shadow-lg">
                  <VideoPlayer
                    url={
                      getIndexOfFreePreviewUrl !== -1
                        ? studentViewCourseDetails?.curriculum[
                            getIndexOfFreePreviewUrl
                          ].videoUrl
                        : ""
                    }
                    width="100%"
                    height="100%"
                  />
                </div>
                
                <div className="mb-6 text-center">
                  <span className="text-4xl font-bold text-gray-800">
                    ₹{studentViewCourseDetails?.pricing}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">One-time payment</p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleCreatePayment} 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    🛒 Buy Now
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => isInWishlist(studentViewCourseDetails?._id) 
                        ? removeFromWishlist(studentViewCourseDetails?._id)
                        : addToWishlist(studentViewCourseDetails)
                      }
                      className={`border-2 font-semibold py-3 rounded-lg transition-all duration-200 ${
                        isInWishlist(studentViewCourseDetails?._id)
                          ? 'border-red-300 text-red-600 hover:bg-red-50'
                          : 'border-blue-200 hover:border-blue-300 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${
                        isInWishlist(studentViewCourseDetails?._id) ? 'fill-current' : ''
                      }`} />
                      {isInWishlist(studentViewCourseDetails?._id) ? 'Remove' : 'Wishlist'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => isInCart(studentViewCourseDetails?._id)
                        ? removeFromCart(studentViewCourseDetails?._id)
                        : addToCart(studentViewCourseDetails)
                      }
                      className={`border-2 font-semibold py-3 rounded-lg transition-all duration-200 ${
                        isInCart(studentViewCourseDetails?._id)
                          ? 'border-green-300 text-green-600 hover:bg-green-50'
                          : 'border-blue-200 hover:border-blue-300 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {isInCart(studentViewCourseDetails?._id) ? 'Remove' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-center">
                      <span className="mr-2">✅</span>
                      Full lifetime access
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✅</span>
                      Access on mobile and TV
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✅</span>
                      Certificate of completion
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✅</span>
                      30-Day money-back guarantee
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
      
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <VideoPlayer
              url={displayCurrentVideoFreePreview}
              width="450px"
              height="200px"
            />
          </div>
          <div className="flex flex-col gap-2">
            {studentViewCourseDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filteredItem) => (
                <p
                  onClick={() => handleSetFreePreview(filteredItem)}
                  className="cursor-pointer text-[16px] font-medium"
                >
                  {filteredItem?.title}
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
