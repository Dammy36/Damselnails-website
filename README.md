# Damsel Nails Studio — Website

A multi-page business website for Damsel Nails Studio, a nail salon in Egbeda, Lagos. It shows the studio's services and prices, a photo gallery, and a contact form, so customers can easily get in touch.

**Live site:** https://damselnaills.netlify.app/

## Pages

- **Home**: introduction to the studio
- **Services**: nail services and pricing
- **Gallery**: photo gallery with a lightbox (click a photo to see it larger)
- **About**: the studio's story
- **Contact**: contact form and location
- **Privacy Policy**

## Features

- Responsive design with a mobile hamburger menu
- Image slider built with Swiper
- Gallery lightbox that closes with a click or the Escape key
- Contact form that sends enquiries to an n8n automation and shows the customer whether their message was sent
- Image admin page where the studio owner can log in and update the site's photos without touching the code. The photos are stored in Supabase.
- SEO basics: page titles, meta descriptions, `sitemap.xml` and `robots.txt`

## Built with

- HTML, CSS and JavaScript
- Tailwind CSS
- [Swiper](https://swiperjs.com/) for the image slider
- [Supabase](https://supabase.com/) for image storage and admin login
- n8n webhook for the contact form
- Deployed on Netlify

## Project journey

This started as a one-page Bootstrap landing page and grew into a full multi-page website as the business needed more features.

## Run it locally

1. Download or clone this repo.
2. Open `index.html` in your browser.

The image admin needs your own Supabase project. See `supabase/schema.sql` for the database setup.
