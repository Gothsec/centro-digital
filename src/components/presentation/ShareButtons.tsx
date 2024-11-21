import { Facebook, Instagram, Share2, MessageCircle, MapPin, ExternalLink } from 'lucide-react';

interface ShareButtonsProps {
  business: {
    nombre: string;
    direccion: string;
    redes: {
      whatsapp?: string;
      facebook?: string;
      instagram?: string;
    };
  };
}

export const ShareButtons = ({ business }: ShareButtonsProps) => {
  const shareUrl = window.location.href;
  const shareText = `Check out ${business.nombre}!`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.nombre} ${business.direccion}`
  )}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.nombre,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Social Media Links */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Social Media</h3>
        <div className="inline-flex flex-col gap-4">
          {business.redes.whatsapp && (
            <a
              href={business.redes.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
          )}
          {business.redes.facebook && (
            <a
              href={business.redes.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="text-sm font-medium">Facebook</span>
            </a>
          )}
          {business.redes.instagram && (
            <a
              href={business.redes.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm font-medium">Instagram</span>
            </a>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
        <div className="flex gap-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Open in Maps</span>
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};