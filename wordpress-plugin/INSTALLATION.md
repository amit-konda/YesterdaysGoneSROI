# WordPress Elementor Widget Installation Guide

This guide will help you install the Yesterday's Gone SROI Calculator widget in your WordPress site with Elementor.

## Prerequisites

- WordPress installation
- Elementor Pro plugin installed and activated
- Access to your WordPress file system (via FTP, cPanel, or SSH)

## Step 1: Upload the Plugin

1. **Copy the plugin folder** from this directory:
   ```
   wordpress-plugin/yesterdays-gone-sroi-widget/
   ```

2. **Upload to WordPress** using one of these methods:

   **Option A: Via FTP/cPanel File Manager**
   - Navigate to `wp-content/plugins/` on your WordPress server
   - Upload the entire `yesterdays-gone-sroi-widget` folder
   - Ensure the folder structure is: `wp-content/plugins/yesterdays-gone-sroi-widget/`

   **Option B: Via WordPress Admin (if you have zip access)**
   - Zip the `yesterdays-gone-sroi-widget` folder
   - Go to WordPress Admin → Plugins → Add New → Upload Plugin
   - Upload the zip file

## Step 2: Activate the Plugin

1. Go to **WordPress Admin → Plugins**
2. Find **"Yesterday's Gone SROI Widget"**
3. Click **"Activate"**

## Step 3: Build and Host Your React App

1. **Build your React app:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting. Options:
   - **Subdomain**: `sroi.yesterdaysgone.org` (recommended)
   - **Subdirectory**: `yesterdaysgone.org/sroi/`
   - **CDN/Static Hosting**: Any static hosting service

3. **Note the URL** where your app is hosted (you'll need this in Step 4)

## Step 4: Use the Widget in Elementor

1. **Edit a page** with Elementor (or create a new one)

2. **Find the widget:**
   - In the Elementor panel, look for the **"Yesterday's Gone"** category
   - You'll see the **"SROI Calculator"** widget

3. **Drag the widget** onto your page

4. **Configure the widget:**
   - **SROI App URL**: Enter the URL where your React app is hosted
     - Example: `https://sroi.yesterdaysgone.org`
   - **Height (px)**: Initial iframe height (default: 1200px)
   - **Auto-Resize Height**: Enable this (default: Yes) to automatically adjust height

5. **Style options** (optional):
   - **Border Radius**: Round the corners of the iframe
   - **Padding**: Add spacing around the widget

6. **Save and publish** your page

## Troubleshooting

### Widget doesn't appear in Elementor
- Make sure Elementor Pro is installed and activated
- Clear Elementor cache: Elementor → Tools → Regenerate CSS & Data
- Check that the plugin is activated in WordPress Admin → Plugins

### Iframe shows blank or doesn't load
- Verify the SROI App URL is correct and accessible
- Check browser console for CORS errors
- Ensure your React app is built and deployed correctly
- Try accessing the URL directly in a browser

### Auto-resize not working
- Make sure "Auto-Resize Height" is enabled in widget settings
- Verify the React app includes the auto-resize code (it's already added to App.tsx)
- Check browser console for JavaScript errors

### Styling conflicts
- The iframe approach isolates your React app from WordPress styles
- If you see layout issues, try adjusting the widget's padding settings
- The React app uses Tailwind CSS which is scoped to the iframe

## File Structure

After installation, your WordPress should have:

```
wp-content/plugins/yesterdays-gone-sroi-widget/
├── yesterdays-gone-sroi-widget.php
└── widgets/
    └── sroi-calculator-widget.php
```

## Support

If you encounter issues:
1. Check WordPress and Elementor error logs
2. Verify all file permissions are correct (folders: 755, files: 644)
3. Ensure PHP version is 7.4 or higher
4. Check that Elementor Pro is up to date

## Next Steps

- Customize the widget styling in Elementor
- Test on different devices and screen sizes
- Consider adding the widget to multiple pages or templates

