"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('accessToken'));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Toggle visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      // Update scrolled state for background opacity
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/auth/login');
  };

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: `translateX(-50%) translateY(${isVisible ? '0' : '-130%'})`,
      width: '90%',
      maxWidth: '1200px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: isScrolled ? 'rgba(20, 20, 25, 0.9)' : 'var(--glass)',
      backdropFilter: 'blur(20px)',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Heart size={32} color="var(--primary)" fill="var(--primary)" className="float" />
        <span style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-1px' }}>
          My<span className="gradient-text">Heart</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: '500', opacity: 0.8 }}>Home</Link>
        <Link href="/services" style={{ fontWeight: '500', opacity: 0.8 }}>Services</Link>
        
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--primary)' }}>
              <User size={18} /> Dashboard
            </Link>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', opacity: 0.8, color: '#ef4444' }}>
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" style={{ fontWeight: '500', opacity: 0.8 }}>Login</Link>
            <Link href="/auth/register" className="btn-primary">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
