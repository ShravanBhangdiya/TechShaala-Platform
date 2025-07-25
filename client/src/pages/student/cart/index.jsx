import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/cart-context";
import { ShoppingCart, Heart, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, wishlist, removeFromCart, removeFromWishlist, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // For now, just redirect to the first course in cart
    if (cart.length > 0) {
      navigate(`/course/details/${cart[0]._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Cart & Wishlist
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Section */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                  Shopping Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <Button 
                      onClick={() => navigate("/courses")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Explore Courses
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((course) => (
                      <div key={course._id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {course.instructorName}</p>
                          <p className="text-lg font-bold text-blue-600">₹{course.pricing}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(course._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">₹{getCartTotal().toFixed(2)}</span>
                      </div>
                      <Button 
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Wishlist Section */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <Heart className="h-6 w-6 text-red-500" />
                  Wishlist ({wishlist.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {wishlist.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                    <Button 
                      onClick={() => navigate("/courses")}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                    >
                      Explore Courses
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlist.map((course) => (
                      <div key={course._id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {course.instructorName}</p>
                          <p className="text-lg font-bold text-red-600">₹{course.pricing}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromWishlist(course._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/course/details/${course._id}`)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage; 