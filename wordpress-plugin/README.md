# Yesterday's Gone SROI Widget - WordPress Plugin

This WordPress plugin adds an Elementor widget that embeds the SROI Calculator React app via iframe.

## What's Included

- **Main Plugin File**: `yesterdays-gone-sroi-widget.php` - Registers the widget with Elementor
- **Widget Class**: `widgets/sroi-calculator-widget.php` - The actual Elementor widget implementation
- **Installation Guide**: `INSTALLATION.md` - Step-by-step setup instructions

## Quick Start

1. Copy the `yesterdays-gone-sroi-widget` folder to `wp-content/plugins/` on your WordPress server
2. Activate the plugin in WordPress Admin → Plugins
3. Build your React app: `npm run build`
4. Host the `dist` folder somewhere (subdomain, subdirectory, or CDN)
5. Add the widget in Elementor and configure the SROI App URL

See `INSTALLATION.md` for detailed instructions.

## Features

- ✅ Easy Elementor integration
- ✅ Configurable iframe URL and height
- ✅ Auto-resize functionality (when enabled)
- ✅ Customizable styling (border radius, padding)
- ✅ Isolated from WordPress/Elementor styles (via iframe)

## Requirements

- WordPress 5.0+
- Elementor Pro
- PHP 7.4+

