import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Calendar, Palette, User, Shield } from 'lucide-react';
import { Kitten } from '@/types/kitten';
import { useCart } from '@/contexts/CartContext';

interface KittenDetailsModalProps {
  kitten: Kitten | null;
  isOpen: boolean;
  onClose: () => void;
}

const KittenDetailsModal: React.FC<KittenDetailsModalProps> = ({
  kitten,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();

  if (!kitten) return null;

  const handleAddToCart = () => {
    console.log('Adding to cart from modal:', kitten.name);
    addToCart(kitten);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{kitten.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={kitten.image}
              alt={kitten.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Información básica</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Raza: {kitten.breed}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Edad: {kitten.age} {kitten.age === 1 ? 'año' : 'años'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Color: {kitten.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Género: {kitten.gender === 'male' ? 'Macho' : 'Hembra'}</span>
                </div>
                {kitten.vaccinated && (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Vacunado</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Estado</h3>
              <Badge 
                variant={kitten.available ? "default" : "secondary"}
                className="mb-2"
              >
                {kitten.available ? 'Disponible para adopción' : 'No disponible'}
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Precio</h3>
              <p className="text-2xl font-bold text-primary">
                ${kitten.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Descripción</h3>
          <p className="text-muted-foreground leading-relaxed">
            {kitten.description}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1">
            <Heart className="h-4 w-4 mr-2" />
            Agregar a favoritos
          </Button>
          <Button 
            onClick={handleAddToCart}
            disabled={!kitten.available}
            className="flex-1"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adoptar ahora
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KittenDetailsModal;