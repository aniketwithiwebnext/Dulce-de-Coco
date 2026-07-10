import React, { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Wholesale Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Wholesale Inquiry",
        message: ""
      });
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" id="contact-details-grid">
      {/* Contact Info (Davenport, Florida) */}
      <div className="lg:col-span-5 space-y-6" id="contact-info-panel">
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#4B5D41] uppercase">
            Let's Stay in Touch
          </span>
          <h3 className="font-serif text-3xl font-bold text-[#3D2B1F]">
            Visit Our Tropical Oasis in Davenport
          </h3>
          <p className="text-sm sm:text-base text-[#5C4D42] leading-relaxed">
            Have questions about wholesaling, custom formulations, or allergies? Reach out directly. Our family-owned kitchen is here to help bring sweet inclusive treats to your table.
          </p>
        </div>

        <div className="space-y-4" id="contact-info-list">
          {/* Address */}
          <div className="flex items-start space-x-4 p-4 bg-[#E8E2D6]/40 rounded-2xl border border-[#F0ECE4]">
            <span className="p-3 bg-[#4B5D41] rounded-xl text-white">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-semibold text-sm text-[#3D2B1F]">Kitchen & Dispatch HQ</h4>
              <p className="text-sm text-[#5C4D42] mt-0.5">Davenport, Florida 33837</p>
              <p className="text-xs text-[#4B5D41] font-medium mt-1">Orlando-Kissimmee Metro Area</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4 p-4 bg-[#E8E2D6]/40 rounded-2xl border border-[#F0ECE4]">
            <span className="p-3 bg-[#4B5D41] rounded-xl text-white">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-semibold text-sm text-[#3D2B1F]">Direct Phone Line</h4>
              <p className="text-sm text-[#5C4D42] mt-0.5">
                <a href="tel:863-360-6088" className="hover:text-[#4B5D41] transition-colors">
                  863-360-6088
                </a>
              </p>
              <p className="text-xs text-[#5C4D42] italic mt-0.5">Mon - Sat: 9am - 6pm EST</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4 p-4 bg-[#E8E2D6]/40 rounded-2xl border border-[#F0ECE4]">
            <span className="p-3 bg-[#4B5D41] rounded-xl text-white">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-semibold text-sm text-[#3D2B1F]">Email Inquiries</h4>
              <p className="text-sm text-[#5C4D42] mt-0.5">
                <a href="mailto:gabrielabmgm29@gmail.com" className="hover:text-[#4B5D41] transition-colors">
                  gabrielabmgm29@gmail.com
                </a>
              </p>
              <p className="text-xs text-[#4B5D41] font-semibold mt-1">Guaranteed response within 24 hours</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start space-x-4 p-4 bg-[#E8E2D6]/40 rounded-2xl border border-[#F0ECE4]">
            <span className="p-3 bg-[#4B5D41] rounded-xl text-white">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-semibold text-sm text-[#3D2B1F]">Operating Hours</h4>
              <ul className="text-xs sm:text-sm text-[#5C4D42] mt-1 space-y-0.5">
                <li className="flex justify-between space-x-4"><span className="font-medium">Mon - Fri:</span> <span>9:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between space-x-4"><span className="font-medium">Saturday:</span> <span>10:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between space-x-4"><span className="font-medium">Sunday:</span> <span className="text-[#4B5D41] font-medium">Closed for Family Day</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Form and Maps */}
      <div className="lg:col-span-7 space-y-6" id="contact-form-and-map">
        {/* Contact Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F0ECE4] shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-[#5C4D42] uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Chef Gabriela"
                      className="w-full bg-[#F9F7F2] border border-[#F0ECE4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#4B5D41] text-[#3D2B1F]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[#5C4D42] uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. chef@kitchen.com"
                      className="w-full bg-[#F9F7F2] border border-[#F0ECE4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#4B5D41] text-[#3D2B1F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-[#5C4D42] uppercase tracking-wider">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 863-360-6088"
                      className="w-full bg-[#F9F7F2] border border-[#F0ECE4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#4B5D41] text-[#3D2B1F]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-[#5C4D42] uppercase tracking-wider">
                      Inquiry Type
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F9F7F2] border border-[#F0ECE4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#4B5D41] text-[#3D2B1F]"
                    >
                      <option value="Wholesale Inquiry">Wholesale & Distribution</option>
                      <option value="Order Support">Order Status & Support</option>
                      <option value="Allergy Question">Allergies & Ingredients</option>
                      <option value="Other">General Question</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-[#5C4D42] uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your culinary project or business..."
                    className="w-full bg-[#F9F7F2] border border-[#F0ECE4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#4B5D41] text-[#3D2B1F] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#3D2B1F] hover:bg-[#4B5D41] text-[#F9F7F2] font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="submission-success"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-600 mb-2">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#3D2B1F]">Inquiry Successfully Sent!</h4>
                <p className="text-sm text-[#5C4D42] max-w-md mx-auto">
                  Thank you for reaching out to Dulce de Coco. Chef Gabriela or one of our kitchen leads in Davenport will respond directly to you at your provided email within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 border border-[#4B5D41] text-[#4B5D41] rounded-full font-semibold hover:bg-[#4B5D41]/5 transition-all text-sm"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Google Maps Placeholder */}
        <div className="relative h-[220px] rounded-3xl border border-[#F0ECE4] overflow-hidden shadow-sm" id="google-maps-location-frame">
          <div className="absolute inset-0 bg-[#E8E2D6]/20 flex flex-col items-center justify-center text-center p-4">
            <MapPin className="h-8 w-8 text-[#4B5D41] mb-2 animate-bounce" />
            <h5 className="font-serif font-bold text-base text-[#3D2B1F]">Davenport, Florida</h5>
            <p className="text-xs text-[#5C4D42] mt-0.5">Located near Highway 27 and Interstate 4</p>
            <p className="text-[10px] text-[#4B5D41] tracking-wider uppercase font-bold mt-2">Serving Sunshine State Bakers & Worldwide Shipping</p>
          </div>
          {/* Aesthetic map style layout */}
          <div className="w-full h-full opacity-10 bg-[radial-gradient(#4b5d41_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
      </div>
    </div>
  );
}
