import React, { useState } from 'react';
import { apiUrl } from '../utils/api';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Upload, X, FileText, Image, Box } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    service: '',
    message: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Accepted file types
  const acceptedFileTypes = {
    // 3D Files
    '.stl': 'STL',
    '.obj': 'OBJ', 
    '.step': 'STEP',
    '.stp': 'STEP',
    '.3mf': '3MF',
    '.iges': 'IGES',
    '.igs': 'IGES',
    // Images
    '.jpg': 'JPG',
    '.jpeg': 'JPEG',
    '.png': 'PNG',
    '.gif': 'GIF',
    '.webp': 'WebP',
    // Documents
    '.pdf': 'PDF'
  };

  const maxFileSize = 50 * 1024 * 1024; // 50MB
  const maxFiles = 5;

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    if (['.stl', '.obj', '.step', '.stp', '.3mf', '.iges', '.igs'].includes(extension)) {
      return <Box className="w-5 h-5 text-blue-600" />;
    } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extension)) {
      return <Image className="w-5 h-5 text-green-600" />;
    } else if (extension === '.pdf') {
      return <FileText className="w-5 h-5 text-red-600" />;
    }
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File) => {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!Object.keys(acceptedFileTypes).includes(extension)) {
      return `File type ${extension} is not supported. Please upload STL, OBJ, STEP, 3MF, IGES, images, or PDF files.`;
    }
    
    if (file.size > maxFileSize) {
      return `File size must be less than ${formatFileSize(maxFileSize)}.`;
    }
    
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
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        newFiles.push(file);
      }
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create FormData for file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('message', formData.message);
      
      // Add files
      uploadedFiles.forEach((file) => {
        formDataToSend.append('files', file);
      });

      // Send to backend API
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', mobile: '', service: '', message: '' });
        setUploadedFiles([]);
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again or contact us directly.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-orange-500 py-20">
        <div className="container01 mx-auto px-4 text-center">
          <h1 className="text-5xl text-white mb-6">Get In Touch</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block text-gray-700 mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-gray-700 mb-2">
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="3d-printing">3D Printing Services</option>
                    <option value="cad-modeling">CAD Modeling</option>
                    <option value="prototyping">Prototyping</option>
                    <option value="architectural-miniature">Architectural Miniature Model Service</option>
                    <option value="custom-gifts">Custom Gifts</option>
                    <option value="bulk-manufacturing">Bulk Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your project, requirements, timeline, etc."
                  />
                </div>

                {/* File Upload Section */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Upload Files (Optional)
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                      dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">
                        Drag & drop your files here, or{' '}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                          browse
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            accept=".stl,.obj,.step,.stp,.3mf,.iges,.igs,.jpg,.jpeg,.png,.gif,.webp,.pdf"
                            onChange={(e) => handleFileUpload(e.target.files)}
                          />
                        </label>
                      </p>
                      <p className="text-sm text-gray-500">
                        Supported: STL, OBJ, STEP, 3MF, IGES, Images, PDF (Max 50MB each, {maxFiles} files)
                      </p>
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-700 font-medium">
                        Uploaded Files ({uploadedFiles.length}/{maxFiles}):
                      </p>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.name)}
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>

                <p className="text-sm text-gray-600">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+917905620142" className="text-gray-600 hover:text-blue-600">
                      +91 79056 20142
                    </a>
                    <br />
                    <a href="tel:+917992444628" className="text-gray-600 hover:text-blue-600">
                      +91 79924 44628
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@the3dindia.com" className="text-gray-600 hover:text-blue-600">
                      info@the3dindia.com
                    </a>
                    <br />
                    <a href="mailto:sales@the3dindia.com" className="text-gray-600 hover:text-blue-600">
                      sales@the3dindia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">
                      K-31, Vastu Vihar, B.I.T. Road,
                      <br />
                      Mesra, Ranchi,
                      <br />
                      Jharkhand 835215, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/917905620142"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-2"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-xl">Business Hours</h3>
                </div>
                <div className="space-y-3 text-blue-100">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-blue-100">
                    24/7 Support available via email and WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">Visit Our Workshop</h2>
            <p className="text-xl text-gray-600">
              Come see our state-of-the-art facilities and equipment
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="aspect-[16/9] bg-gray-200 rounded-2xl overflow-hidden">
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.6158425982916!2d85.43006397526954!3d23.414475878907863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4fb72c3ffffff%3A0x47fbef1cc31d91c5!2sBirla%20Institute%20of%20Technology%2C%20Mesra!5e0!3m2!1sen!2sin!4v1734471234567!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> */}
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.8683160962805!2d85.42415997483619!3d23.42912360103537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e5af59e20011%3A0x26dca68d8f69119c!2sThe3DIndia!5e0!3m2!1sen!2sin!4v1767264224408!5m2!1sen!2sin" 
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
