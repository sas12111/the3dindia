import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../utils/api';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Box,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Zap,
  Lightbulb,
  Sparkles,
  ShieldCheck,
  Users,
  Navigation,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const SERVICE_OPTIONS = [
  { value: '3d-printing', label: '3D Printing Services' },
  { value: 'cad-modeling', label: '3D Designing / CAD Modeling' },
  { value: 'prototyping-product-development', label: 'Prototyping & Product Development' },
  { value: 'functional-parts', label: 'Functional Parts & Utility Products' },
  { value: 'miniature-architectural-models', label: 'Miniature & Architectural Models' },
  { value: 'medical-anatomical-models', label: 'Medical & Anatomical Models' },
  { value: 'customized-gifts', label: 'Customized Gifts & Personalized Items' },
  { value: 'bulk-manufacturing', label: 'Bulk Manufacturing' },
  { value: 'other', label: 'Other' },
];

const heroBenefits = [
  { icon: Zap, label: 'Quick Response' },
  { icon: Lightbulb, label: 'Expert Guidance' },
  { icon: Sparkles, label: 'Custom Solutions' },
  { icon: Users, label: 'For Individuals & Businesses' },
];

const benefits = [
  { icon: Zap, title: 'Quick Response', desc: 'We aim to respond as soon as possible.' },
  { icon: Lightbulb, title: 'Expert Guidance', desc: 'Get help choosing the right solution for your needs.' },
  { icon: Sparkles, title: 'Custom Solutions', desc: 'For individuals, businesses and industries.' },
  { icon: ShieldCheck, title: 'Secure & Confidential', desc: 'Your project details are handled responsibly.' },
];

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.8683160962805!2d85.42415997483619!3d23.42912360103537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e5af59e20011%3A0x26dca68d8f69119c!2sThe3DIndia!5e0!3m2!1sen!2sin!4v1767264224408!5m2!1sen!2sin';
const MAP_DIRECTIONS = 'https://www.google.com/maps/search/?api=1&query=The3DIndia+Mesra+Ranchi';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', service: '', message: '' });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const acceptedFileTypes: Record<string, string> = {
    '.stl': 'STL', '.obj': 'OBJ', '.step': 'STEP', '.stp': 'STEP', '.3mf': '3MF', '.iges': 'IGES', '.igs': 'IGES',
    '.jpg': 'JPG', '.jpeg': 'JPEG', '.png': 'PNG', '.gif': 'GIF', '.webp': 'WebP', '.pdf': 'PDF',
  };
  const maxFileSize = 50 * 1024 * 1024; // 50MB
  const maxFiles = 5;

  const getFileIcon = (fileName: string) => {
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    if (['.stl', '.obj', '.step', '.stp', '.3mf', '.iges', '.igs'].includes(ext)) return <Box className="h-5 w-5 text-[#f78e00]" />;
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) return <ImageIcon className="h-5 w-5 text-green-600" />;
    if (ext === '.pdf') return <FileText className="h-5 w-5 text-red-600" />;
    return <FileText className="h-5 w-5 text-gray-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File) => {
    const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!Object.keys(acceptedFileTypes).includes(ext)) {
      return `File type ${ext} is not supported. Please upload STL, OBJ, STEP, 3MF, IGES, images or PDF files.`;
    }
    if (file.size > maxFileSize) return `File size must be less than ${formatFileSize(maxFileSize)}.`;
    return null;
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles: File[] = [];
    const errors: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (uploadedFiles.length + newFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed.`);
        break;
      }
      const error = validateFile(file);
      if (error) errors.push(`${file.name}: ${error}`);
      else newFiles.push(file);
    }
    if (errors.length > 0) setStatus({ type: 'error', msg: errors.join(' ') });
    if (newFiles.length > 0) setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => setUploadedFiles((prev) => prev.filter((_, i) => i !== index));

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; // prevent duplicate submissions
    setSubmitting(true);
    setStatus(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('mobile', formData.mobile);
      payload.append('service', formData.service);
      payload.append('message', formData.message);
      uploadedFiles.forEach((file) => payload.append('files', file));

      const response = await fetch(apiUrl('/api/contact'), { method: 'POST', body: payload });
      const result = await response.json();

      if (result.success) {
        setStatus({ type: 'success', msg: 'Thank you for your inquiry! We will get back to you as soon as possible.' });
        setFormData({ name: '', email: '', mobile: '', service: '', message: '' });
        setUploadedFiles([]);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus({ type: 'error', msg: 'There was an error submitting your form. Please try again or contact us directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition-colors focus:border-[#f78e00] focus:ring-2 focus:ring-[#f78e00]/30';

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#fff8f0] to-[#fff1e0]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#f78e00]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 py-14 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#f78e00]" />
                <span className="text-xs font-semibold tracking-[0.22em] text-[#e07e00]">GET IN TOUCH</span>
              </div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Have a Project <span className="text-[#f78e00]">in Mind?</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-gray-600">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-8">
                {heroBenefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]">
                      <b.icon className="h-5 w-5 text-[#f78e00]" />
                    </span>
                    <span className="text-sm font-medium leading-tight text-gray-800">{b.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
                <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-[#f78e00]/15 to-orange-300/20 blur-2xl lg:h-80 lg:w-80" />
              </div>
              <ImageWithFallback
                src="/images/contact/contact-hero-3d-printed-products.jpg"
                alt="A composition of 3D printed products — black brackets and gears, white components and a lattice print"
                loading="eager"
                className="mx-auto w-full max-w-xl rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MAIN CONTACT (form + info)                                         */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container01 mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* FORM CARD */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-start gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]">
                    <Mail className="h-5 w-5 text-[#f78e00]" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">Send Us a Message</h2>
                    <p className="mt-1 text-sm text-gray-600">Tell us about your project and our team will get back to you soon.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">Full Name *</label>
                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" className={inputClass} />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">Email Address *</label>
                      <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-gray-700">Mobile Number *</label>
                      <input id="mobile" name="mobile" type="tel" required value={formData.mobile} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-gray-700">Service Required *</label>
                    <select id="service" name="service" required value={formData.service} onChange={handleChange} className={inputClass}>
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-700">Project Details *</label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us about your project, requirements, timeline, etc." className={`${inputClass} resize-none`} />
                  </div>

                  {/* file upload */}
                  <div>
                    <span className="mb-1.5 block text-sm font-medium text-gray-700">Upload Files (Optional)</span>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${dragActive ? 'border-[#f78e00] bg-[#fff8f0]' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <Upload className="mx-auto mb-2 h-7 w-7 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Drag &amp; drop your files here, or{' '}
                        <label className="cursor-pointer font-medium text-[#f78e00] underline hover:text-[#e07e00] focus-within:outline-none">
                          browse
                          <input
                            type="file"
                            multiple
                            className="sr-only"
                            accept=".stl,.obj,.step,.stp,.3mf,.iges,.igs,.jpg,.jpeg,.png,.gif,.webp,.pdf"
                            onChange={(e) => handleFileUpload(e.target.files)}
                          />
                        </label>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Supported: STL, OBJ, STEP, 3MF, IGES, images, PDF (max 50MB each, {maxFiles} files)</p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
                            <span className="flex min-w-0 items-center gap-3">
                              {getFileIcon(file.name)}
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium text-gray-900">{file.name}</span>
                                <span className="block text-xs text-gray-500">{formatFileSize(file.size)}</span>
                              </span>
                            </span>
                            <button type="button" onClick={() => removeFile(index)} aria-label={`Remove ${file.name}`} className="p-1 text-red-500 transition-colors hover:text-red-700">
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* status message */}
                  {status && (
                    <div
                      role="status"
                      aria-live="polite"
                      className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${status.type === 'success' ? 'border-green-200 bg-green-50 text-green-800' : 'border-red-200 bg-red-50 text-red-800'}`}
                    >
                      {status.type === 'success' ? <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />}
                      <span>{status.msg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f78e00]"
                  >
                    {submitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</> : <><Send className="h-5 w-5" /> Send Message</>}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    By submitting this form, you agree to our{' '}
                    <Link to="/contact" className="text-[#e07e00] hover:underline">Privacy Policy</Link> and{' '}
                    <Link to="/contact" className="text-[#e07e00] hover:underline">Terms of Service</Link>.
                  </p>
                </form>
              </div>
            </div>

            {/* INFO COLUMN */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
                <p className="mt-1 text-sm text-gray-600">Reach out to us through any of the following channels. We're here to help!</p>

                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]"><Phone className="h-5 w-5 text-[#f78e00]" /></span>
                    <div>
                      <h3 className="font-medium text-gray-900">Phone</h3>
                      <a href="tel:+917905620142" className="block text-sm text-gray-600 hover:text-[#f78e00]">+91 79056 20142</a>
                      <a href="tel:+917992444628" className="block text-sm text-gray-600 hover:text-[#f78e00]">+91 79924 44628</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]"><Mail className="h-5 w-5 text-[#f78e00]" /></span>
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <a href="mailto:info@the3dindia.com" className="block text-sm text-gray-600 hover:text-[#f78e00]">info@the3dindia.com</a>
                      <a href="mailto:sales@the3dindia.com" className="block text-sm text-gray-600 hover:text-[#f78e00]">sales@the3dindia.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]"><MapPin className="h-5 w-5 text-[#f78e00]" /></span>
                    <div>
                      <h3 className="font-medium text-gray-900">Location</h3>
                      <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-[#f78e00]">
                        K-31, Vastu Vihar, B.I.T. Road,<br />Mesra, Ranchi, Jharkhand 835215, India
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-100"><MessageCircle className="h-5 w-5 text-green-600" /></span>
                    <div>
                      <h3 className="font-medium text-gray-900">WhatsApp</h3>
                      <a href="https://wa.me/917905620142" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700">
                        <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* business hours */}
              <div className="rounded-2xl bg-gradient-to-br from-[#f78e00] to-[#e07e00] p-6 text-white shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">Business Hours</h3>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4"><dt className="text-white/90">Monday – Friday</dt><dd className="font-medium">9:00 AM – 7:00 PM</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-white/90">Saturday</dt><dd className="font-medium">10:00 AM – 5:00 PM</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-white/90">Sunday</dt><dd className="font-medium">Closed</dd></div>
                </dl>
                <div className="mt-5 border-t border-white/20 pt-4 text-sm text-white/90">
                  Support available via email and WhatsApp.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* BENEFITS STRIP                                                     */}
      {/* ================================================================== */}
      <section className="bg-white py-14 lg:py-16">
        <div className="container01 mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <b.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{b.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* WORKSHOP MAP                                                       */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container01 mx-auto px-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Visit Our Workshop</h2>
              <p className="mt-3 text-lg text-gray-600">Come see our facilities and equipment.</p>
            </div>
            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-[#f78e00] px-5 py-2.5 text-sm font-semibold text-[#f78e00] transition-colors hover:bg-[#f78e00] hover:text-white"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </a>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <div className="aspect-[16/9] w-full bg-gray-200">
              <iframe
                src={MAP_EMBED}
                title="The3DIndia workshop location on Google Maps"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
