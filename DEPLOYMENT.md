# Vercel Deployment Checklist

## ✅ Pre-Deployment Verification

All items below should be checked before deploying:

- [x] **Fonts folder created** at project root (`/fonts`)
- [x] **All 4 font files downloaded and valid:**
  - `Roboto-Regular.ttf` (110KB) ✓
  - `Roboto-Bold.ttf` (111KB) ✓
  - `NotoSansDevanagari-Regular.ttf` (214KB) ✓
  - `NotoSansDevanagari-Bold.ttf` (215KB) ✓
- [x] **vercel.json configured** with `maxDuration: 30` for API routes
- [x] **Font registration code** added inside POST function
- [x] **All Arial usage replaced** with font helper function
- [x] **Local testing passed** - images generate correctly with proper fonts

## 🚀 Deployment Steps

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Fix canvas fonts for production - add font registration and valid TTF files"
   ```

2. **Push to your repository:**
   ```bash
   git push origin main
   # or: git push origin master
   ```

3. **Deploy on Vercel:**
   - If connected to GitHub: Vercel will auto-deploy
   - Or deploy manually via Vercel CLI: `vercel --prod`

## ⚠️ Important Notes for Vercel

1. **Fonts must be committed to Git** - They're in the `fonts/` folder and will be included in deployment
2. **Path resolution** - The code tries multiple paths to find fonts, should work on Vercel
3. **Function timeout** - Set to 30 seconds in `vercel.json` (canvas operations can be slow)
4. **Build process** - Next.js will include the fonts folder in the build

## 🧪 Post-Deployment Testing

After deployment, test:
- [ ] Generate image with English language
- [ ] Generate image with Marathi language (language='1')
- [ ] Generate image with Hindi language (language='2')
- [ ] Verify no □□□□ boxes appear
- [ ] Check that bold text renders correctly
- [ ] Verify text alignment and line wrapping

## 🐛 Troubleshooting

If fonts don't work on Vercel:
1. Check Vercel function logs for font path errors
2. Verify fonts folder is in the deployment (check build logs)
3. Check that font files are valid TTF (not HTML)
4. Review server logs for `registerFont` errors

## 📝 Notes

- Fonts are registered **inside** the POST function (required for Vercel)
- Font registration happens on every request (acceptable for serverless)
- All font files are ~500KB total (acceptable for serverless functions)


