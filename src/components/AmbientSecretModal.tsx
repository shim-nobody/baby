// src/components/AmbientSecretModal.tsx — Romantic hidden notes
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  note: { title: string; text: string; icon: string } | null;
  onClose: () => void;
}

export function AmbientSecretModal({ note, onClose }: Props) {
  return (
    <AnimatePresence>
      {note && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(10, 14, 30, 0.75)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-dark rounded-3xl p-6 max-w-sm w-full text-center relative border border-rosepink/40 shadow-2xl"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3 select-none">{note.icon}</div>
            <h4 className="font-playfair text-lg text-gold mb-2">{note.title}</h4>
            <p className="font-dm text-sm text-warmIvory/90 leading-relaxed mb-6">
              "{note.text}"
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full font-dm text-xs text-navy font-semibold transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #F59ABB, #FFF7ED)' }}
            >
              Keep Close to Heart ❤️
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

