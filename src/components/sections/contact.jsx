// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Label } from "../ui/label";
// import { contactInfo } from "../../data/content";

// const contactDetails = [
//   {
//     icon: Mail,
//     label: "Email",
//     value: contactInfo.email,
//     href: `mailto:${contactInfo.email}`,
//   },
//   {
//     icon: Phone,
//     label: "Phone",
//     value: contactInfo.phone,
//     href: `tel:${contactInfo.phone}`,
//   },
//   {
//     icon: MapPin,
//     label: "Location",
//     value: contactInfo.location,
//     href: "#",
//   },
// ];

// export function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setIsSubmitting(false);
//     setFormData({ name: "", email: "", subject: "", message: "" });
//   };

//   return (
//     <section id="contact" className="relative py-24 bg-black overflow-hidden">
//       <div className="absolute inset-0 bg-radial-gradient opacity-30" />

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
//             Get In Touch
//           </h2>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             Have questions? We&apos;d love to hear from you
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Info */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h3 className="text-xl font-bold text-white mb-4">
//               Contact Information
//             </h3>
//             <p className="text-slate-400 mb-8">
//               Feel free to reach out to us through any of these channels.
//               We&apos;re always here to help!
//             </p>

//             <div className="space-y-4 mb-8">
//               {contactDetails.map((detail, index) => (
//                 <motion.a
//                   key={detail.label}
//                   href={detail.href}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   whileHover={{ scale: 1.02, x: 5 }}
//                   className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300"
//                 >
//                   <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
//                     <detail.icon className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <span className="text-slate-500 text-sm block">
//                       {detail.label}
//                     </span>
//                     <span className="text-white font-medium">
//                       {detail.value}
//                     </span>
//                   </div>
//                 </motion.a>
//               ))}
//             </div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.3 }}
//               className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <Clock className="w-5 h-5 text-blue-400" />
//                 <h4 className="text-white font-semibold">Office Hours</h4>
//               </div>
//               <div className="space-y-2 text-sm">
//                 <p className="text-slate-400">{contactInfo.hours.weekday}</p>
//                 <p className="text-slate-400">{contactInfo.hours.saturday}</p>
//                 <p className="text-slate-500">{contactInfo.hours.sunday}</p>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <form
//               onSubmit={handleSubmit}
//               className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8"
//             >
//               <div className="space-y-6">
//                 <div>
//                   <Label
//                     htmlFor="contact-name"
//                     className="text-white mb-2 block"
//                   >
//                     Name <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="contact-name"
//                     placeholder="John Doe"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     required
//                     className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <Label
//                     htmlFor="contact-email"
//                     className="text-white mb-2 block"
//                   >
//                     Email <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="contact-email"
//                     type="email"
//                     placeholder="john@example.com"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                     required
//                     className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <Label
//                     htmlFor="contact-subject"
//                     className="text-white mb-2 block"
//                   >
//                     Subject <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="contact-subject"
//                     placeholder="How can we help?"
//                     value={formData.subject}
//                     onChange={(e) =>
//                       setFormData({ ...formData, subject: e.target.value })
//                     }
//                     required
//                     className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <Label
//                     htmlFor="contact-message"
//                     className="text-white mb-2 block"
//                   >
//                     Message <span className="text-red-500">*</span>
//                   </Label>
//                   <Textarea
//                     id="contact-message"
//                     placeholder="Tell us more about your inquiry..."
//                     value={formData.message}
//                     onChange={(e) =>
//                       setFormData({ ...formData, message: e.target.value })
//                     }
//                     required
//                     rows={5}
//                     className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 resize-none"
//                   />
//                 </div>

//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-blue-600 hover:bg-blue-500 py-6 text-base font-medium glow-blue"
//                   >
//                     {isSubmitting ? (
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{
//                           duration: 1,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                         className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                       />
//                     ) : (
//                       <>
//                         Send Message
//                         <Send className="w-5 h-5 ml-2" />
//                       </>
//                     )}
//                   </Button>
//                 </motion.div>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
