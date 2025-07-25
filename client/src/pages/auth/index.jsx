import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { BookOpen, Code, Zap, Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useTheme();

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  console.log(signInFormData);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>
      
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm dark:border-gray-700 relative z-10">
        <Link to={"/"} className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechShaala
            </span>
          </div>
        </Link>
        
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </Button>
      </header>
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Mobile Welcome Message */}
          <div className="lg:hidden text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to <span className="text-blue-600 dark:text-blue-400">TechShaala</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Master the latest technologies with our comprehensive learning platform.
            </p>
          </div>
          
          {/* Left Side - Welcome Content */}
          <div className="hidden lg:block space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Welcome to <span className="text-blue-600 dark:text-blue-400">TechShaala</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Master the latest technologies with our comprehensive learning platform. 
                From coding fundamentals to advanced concepts, accelerate your tech journey.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 backdrop-blur-sm">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">100+ Courses</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Expert-led content</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 backdrop-blur-sm">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Learn Fast</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Hands-on projects</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/80 to-pink-600/80"></div>
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-semibold mb-2">Start Your Tech Journey</h3>
                  <p className="text-sm opacity-90">Join thousands of learners mastering new skills</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            <Tabs
              value={activeTab}
              defaultValue="signin"
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger value="signin" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm transition-all duration-200 dark:text-gray-300">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm transition-all duration-200 dark:text-gray-300">
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <Card className="p-6 space-y-4 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back!</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Sign in to continue your learning journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CommonForm
                      formControls={signInFormControls}
                      buttonText={"Sign In"}
                      formData={signInFormData}
                      setFormData={setSignInFormData}
                      isButtonDisabled={!checkIfSignInFormIsValid()}
                      handleSubmit={handleLoginUser}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card className="p-6 space-y-4 border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Join TechShaala</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Start your tech learning journey today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CommonForm
                      formControls={signUpFormControls}
                      buttonText={"Create Account"}
                      formData={signUpFormData}
                      setFormData={setSignUpFormData}
                      isButtonDisabled={!checkIfSignUpFormIsValid()}
                      handleSubmit={handleRegisterUser}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
