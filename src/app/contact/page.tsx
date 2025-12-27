import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <main>
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <Badge variant="secondary" className="px-3 py-1 text-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                Contact Us
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 uppercase">
                                Let's <span className="text-primary">Connect</span>
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-175 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                Have a question, a project idea, or just want to say hello?
                                We're here to help and would love to hear from you.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            {/* Contact Info */}
                            <div className="space-y-12 animate-in fade-in slide-in-from-left duration-1000">
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-black tracking-tight uppercase">Get in touch</h2>
                                    <p className="text-muted-foreground text-lg">
                                        Our team is available to assist you with any inquiries.
                                        Reach out through any of these channels.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Email us</h3>
                                            <p className="text-muted-foreground">hello@blogspace.com</p>
                                            <p className="text-muted-foreground">support@blogspace.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Call us</h3>
                                            <p className="text-muted-foreground">+1 (555) 000-0000</p>
                                            <p className="text-muted-foreground">Mon-Fri from 9am to 6pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Visit us</h3>
                                            <p className="text-muted-foreground">123 Tech Avenue, Suite 456</p>
                                            <p className="text-muted-foreground">Innovation City, IC 78910</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-slate-50 dark:bg-white/2 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl animate-in fade-in slide-in-from-right duration-1000">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-widest text-slate-500">First Name</label>
                                            <Input placeholder="John" className="rounded-xl border-slate-200 bg-white dark:bg-[#0a0a0a]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Last Name</label>
                                            <Input placeholder="Doe" className="rounded-xl border-slate-200 bg-white dark:bg-[#0a0a0a]" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                                        <Input type="email" placeholder="john@example.com" className="rounded-xl border-slate-200 bg-white dark:bg-[#0a0a0a]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Subject</label>
                                        <Input placeholder="How can we help?" className="rounded-xl border-slate-200 bg-white dark:bg-[#0a0a0a]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Message</label>
                                        <Textarea placeholder="Your message here..." className="min-h-37.5 rounded-xl border-slate-200 bg-white dark:bg-[#0a0a0a]" />
                                    </div>
                                    <Button size="lg" className="w-full bg-primary text-white rounded-full font-black uppercase tracking-widest text-[11px] h-12 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                                        Send Message <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="py-16">
                    <div className="container px-4 md:px-6">
                        <div className="w-full h-112.5 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.6038954546!2d31.18842327!3d30.059483849999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa6bb21fc73%3A0x324fc57027d41d!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1703660000000!5m2!1sen!2seg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
