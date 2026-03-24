const { broadcastUploadEvent } = require('../events/sseClients');

function buildFileUrl(req, filename) {
  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/uploads/${filename}`;
}

// POST /api/upload/avatar
function uploadAvatar(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded. Field name must be "avatar".' });
  }

  const fileUrl = buildFileUrl(req, req.file.filename);

  broadcastUploadEvent({
    type: 'avatar-uploaded',
    filename: req.file.filename,
    url: fileUrl,
    uploadedAt: new Date().toISOString(),
  });

  return res.status(201).json({
    message: 'Avatar uploaded successfully',
    url: fileUrl,
  });
}

// POST /api/upload/gallery
function uploadGallery(req, res) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded. Field name must be "gallery".' });
  }

  const urls = req.files.map((f) => buildFileUrl(req, f.filename));

  broadcastUploadEvent({
    type: 'gallery-uploaded',
    count: req.files.length,
    files: urls,
    uploadedAt: new Date().toISOString(),
  });

  return res.status(201).json({
    message: 'Gallery uploaded successfully',
    count: urls.length,
    urls,
  });
}

module.exports = {
  uploadAvatar,
  uploadGallery,
};