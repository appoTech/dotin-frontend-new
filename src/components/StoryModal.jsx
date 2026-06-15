import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { toast } from "sonner";

const StoryModal = ({ isOpen, onClose, link, shortId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Add to Story</DialogTitle>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#9ca3af' }}>
            Share this link in your Instagram or WhatsApp story to earn rewards!
          </p>
          
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <span style={{ fontSize: '14px', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
              {link}
            </span>
            <button 
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                color: copied ? '#4caf50' : '#3b82f6',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          <Button
            onClick={() => {
              window.open("https://instagram.com", "_blank");
              toast.success("Redirecting to Instagram. Paste your link in the link sticker!");
            }}
            className="w-full flex items-center justify-center gap-2"
          >
            <FaInstagram size={18} style={{ marginRight: '8px' }} />
            Open Instagram
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal;
