import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  HeartHandshake 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#171717] text-white pt-16 pb-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#FF6B35]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Lightning 30-Min Delivery</h4>
              <p className="text-xs text-neutral-400">Direct from restaurant kitchen to your doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-[#FFC857]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">100% Certified Hygiene</h4>
              <p className="text-xs text-neutral-400">Inspected kitchen partners with premium packaging</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">24/7 Live Concierge</h4>
              <p className="text-xs text-neutral-400">Dedicated support team for any order assistance</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FFC857] flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-white text-xl font-black">⚡</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                HUNGER<span className="text-[#FF6B35] ml-1">RUSH</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Hunger Rush is on a mission to redefine gourmet on-demand food delivery. Connecting passionate foodies with the finest culinary spots in town with lightning-fast logistics.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#FF6B35] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#FF6B35] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#FF6B35] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#FF6B35] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold tracking-wide uppercase text-neutral-200">Explore</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/explore" className="hover:text-[#FF6B35] transition-colors">Popular Foods</Link></li>
              <li><Link to="/restaurants" className="hover:text-[#FF6B35] transition-colors">Top Restaurants</Link></li>
              <li><Link to="/offers" className="hover:text-[#FF6B35] transition-colors">Discount Offers</Link></li>
              <li><Link to="/wishlist" className="hover:text-[#FF6B35] transition-colors">My Favorites</Link></li>
              <li><Link to="/about" className="hover:text-[#FF6B35] transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold tracking-wide uppercase text-neutral-200">Cuisines</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/explore?category=Pizza" className="hover:text-[#FF6B35] transition-colors">Stone-baked Pizza</Link></li>
              <li><Link to="/explore?category=Biryani" className="hover:text-[#FF6B35] transition-colors">Dum Biryani</Link></li>
              <li><Link to="/explore?category=Burgers" className="hover:text-[#FF6B35] transition-colors">Gourmet Burgers</Link></li>
              <li><Link to="/explore?category=North Indian" className="hover:text-[#FF6B35] transition-colors">North Indian Feast</Link></li>
              <li><Link to="/explore?category=Healthy Food" className="hover:text-[#FF6B35] transition-colors">Healthy Bowls & Keto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold tracking-wide uppercase text-neutral-200">Get in Touch</h5>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#FF6B35]" />
                <span>+91 (080) 4920-RUSH</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF6B35]" />
                <span>support@hungerrush.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                <span>404 Innovation Way, Indiranagar, Bengaluru 560038</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} HUNGER RUSH Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-neutral-400 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-neutral-400 transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-neutral-400 transition-colors">Security</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

