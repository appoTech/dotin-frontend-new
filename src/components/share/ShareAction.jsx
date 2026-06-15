import React from "react";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import "../../css/shareTray.css";

const ShareActions = ({ onShare, onSetStoryOpen }) => {
  const handleShare = async (platform) => {
    try {
      if (platform === 'whatsapp') {
        const text = encodeURIComponent('Join me on this amazing platform!');
        window.open(`https://wa.me/?text=${text}`, '_blank');
      } else {
        await navigator.share({
          title: 'Check out this awesome platform!',
          text: 'Join me on this amazing journey!',
          url: window.location.href,
        });
      }
      onShare(platform);
    } catch (err) {
      console.log("Share failed:", err);
      toast.success("Share point added! (Demo mode)");
      onShare(platform);
    }
  };

  return (
    <div className="share-actions-grid">
      <Button
        variant="outline"
        className="pip-share-whatsapp-btn"
        onClick={() => onSetStoryOpen(true)}
      >
        <Share2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
        Add Story
      </Button>
      <Button
        variant="outline"
        className="pip-share-other-btn"
        onClick={() => handleShare('other')}
      >
        <Share2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
        Share
      </Button>
    </div>
  );
};

export default ShareActions;
