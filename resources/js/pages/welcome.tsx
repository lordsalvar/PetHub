import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
    Heart, 
    FileText, 
    Bell, 
    Lightbulb,
    PawPrint,
    Shield,
    Users,
    Phone
} from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome to PetHub" />
            
            {/* Navigation */}
            <nav className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <PawPrint className="h-8 w-8 text-blue-500" />
                    <span className="text-2xl font-bold text-gray-800">PetHub</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            Register
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                                    Welcome to{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                                        PetHub
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Your Pet's Health Made Simple
                                </p>
                                <p className="text-lg text-gray-500">
                                    Manage health records, appointments, and get helpful pet facts, all in one place.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/register">
                                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                        Get Started
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-4 text-lg rounded-full">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        
                        {/* Pet Illustrations */}
                        <div className="relative">
                            <div className="relative z-10">
                                {/* Dog SVG */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-16 h-16 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4L19 9Z"/>
                                    </svg>
                                </div>
                                
                                {/* Cat SVG */}
                                <div className="absolute top-20 left-0 w-28 h-28 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-14 h-14 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4L19 9Z"/>
                                    </svg>
                                </div>
                                
                                {/* Heart decoration */}
                                <div className="absolute top-10 right-20 w-16 h-16 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg">
                                    <Heart className="w-8 h-8 text-pink-600" />
                                </div>
                            </div>
                            
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-green-100/30 rounded-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Everything Your Pet Needs
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Comprehensive pet health management tools designed with love and care
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <PawPrint className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pet Profiles</h3>
                                <p className="text-gray-600">
                                    Create detailed profiles for all your furry friends with photos, medical history, and preferences.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Health Records</h3>
                                <p className="text-gray-600">
                                    Keep track of vaccinations, medications, and vet visits in one organized place.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Bell className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Reminders</h3>
                                <p className="text-gray-600">
                                    Never miss important appointments or medication schedules with intelligent reminders.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Lightbulb className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Fun Pet Facts</h3>
                                <p className="text-gray-600">
                                    Discover interesting facts and tips to keep your pets happy and healthy.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-500 to-green-500">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Ready to Give Your Pet the Best Care?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of pet owners who trust PetHub for their pet's health management.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="bg-white text-blue-500 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg">
                                    Start Free Today
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-500 px-8 py-4 text-lg rounded-full">
                                View Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <PawPrint className="h-6 w-6 text-blue-400" />
                                <span className="text-xl font-bold">PetHub</span>
                            </div>
                            <p className="text-gray-400">
                                Your trusted partner in pet health management.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 PetHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}