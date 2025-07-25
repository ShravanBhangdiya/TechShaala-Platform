import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { getCategoryLabel } from "@/lib/category-utils";
import { ArrowUpDownIcon, Search, Filter, Grid, List, Star, Clock, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  // Filter courses based on search query
  const filteredCourses = studentViewCoursesList?.filter(course => 
    course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getCategoryLabel(course.category)?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =
      Object.keys(cpyFilters).indexOf(getSectionId);

    console.log(indexOfCurrentSeection, getSectionId);
    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };

      console.log(cpyFilters);
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  async function fetchAllStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllStudentViewCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  console.log(loadingState, "loadingState");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Discover Amazing Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explore our curated collection of expert-led courses designed to accelerate your career
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                List
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full md:w-64 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
              {Object.keys(filterOptions).map((ketItem) => (
                <div key={ketItem} className="mb-6 last:mb-0">
                  <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">{ketItem.toUpperCase()}</h4>
                  <div className="space-y-2">
                    {filterOptions[ketItem].map((option) => (
                      <Label key={option.id} className="flex font-medium items-center gap-3 text-sm">
                        <Checkbox
                          checked={
                            filters &&
                            Object.keys(filters).length > 0 &&
                            filters[ketItem] &&
                            filters[ketItem].indexOf(option.id) > -1
                          }
                          onCheckedChange={() =>
                            handleFilterOnChange(ketItem, option)
                          }
                        />
                        {option.label}
                      </Label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <main className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <ArrowUpDownIcon className="h-4 w-4" />
                        <span className="font-medium">Sort By</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px]">
                      <DropdownMenuRadioGroup
                        value={sort}
                        onValueChange={(value) => setSort(value)}
                      >
                        {sortOptions.map((sortItem) => (
                          <DropdownMenuRadioItem
                            value={sortItem.id}
                            key={sortItem.id}
                          >
                            {sortItem.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {filteredCourses.length} Results
                </span>
              </div>
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses && filteredCourses.length > 0 ? (
                  filteredCourses.map((courseItem) => (
                    <Card
                      onClick={() => handleCourseNavigate(courseItem?._id)}
                      className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800"
                      key={courseItem?._id}
                    >
                      <div className="relative">
                        <img
                          src={courseItem?.image}
                          alt={courseItem?.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                          onError={(e) => {
                            e.target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
                          }}
                        />
                        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          ₹{courseItem?.pricing}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <CardTitle className="text-lg mb-2 text-gray-900 dark:text-white line-clamp-2">
                          {courseItem?.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          by {courseItem?.instructorName}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {courseItem?.level}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {getCategoryLabel(courseItem?.category)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>4.8</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{courseItem?.duration || "42.5 hours"}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : loadingState ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-pulse">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                        <div className="flex justify-between">
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-xl text-gray-600 dark:text-gray-300 mb-2">No Courses Found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses && filteredCourses.length > 0 ? (
                  filteredCourses.map((courseItem) => (
                    <Card
                      onClick={() => handleCourseNavigate(courseItem?._id)}
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800"
                      key={courseItem?._id}
                    >
                      <CardContent className="flex gap-4 p-6">
                        <div className="w-48 h-32 flex-shrink-0">
                          <img
                            src={courseItem?.image}
                            alt={courseItem?.title}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 text-gray-900 dark:text-white">
                            {courseItem?.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            by <span className="font-semibold">{courseItem?.instructorName}</span>
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {`${courseItem?.curriculum?.length || 0} ${
                              (courseItem?.curriculum?.length || 0) <= 1 ? "Lecture" : "Lectures"
                            } - ${courseItem?.level?.toUpperCase() || "ALL"} Level`}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>4.8</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{courseItem?.duration || "42.5 hours"}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 1000) + 100} students</span>
                              </div>
                            </div>
                            <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                              ₹{courseItem?.pricing}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : loadingState ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-pulse">
                      <div className="flex gap-4 p-6">
                        <div className="w-48 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                          <div className="flex justify-between">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl text-gray-600 dark:text-gray-300 mb-2">No Courses Found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms.</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
