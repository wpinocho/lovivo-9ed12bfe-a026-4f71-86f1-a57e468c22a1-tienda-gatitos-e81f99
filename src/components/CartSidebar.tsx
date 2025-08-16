import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CartSidebar: React.FC = () => {
  const { items, removeFromCart, clearCart, getTotalPrice, getItemCount } = useCart();

  const handleCheckout = () => {
    console.log('Processing checkout for items:', items);
    // Aquí iría la lógica de checkout
    alert('¡Gracias por tu adopción! Nos pondremos en contacto contigo pronto.');
    clearCart();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Carrito
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de Adopción</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground mt-1">
                Agrega algunos gatitos adorables para adoptar
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.kitten.id} className="flex gap-3 p-3 border rounded-lg">
                    <img
                      src={item.kitten.image}
                      alt={item.kitten.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.kitten.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.kitten.breed}</p>
                      <p className="text-sm font-semibold text-primary">
                        ${item.kitten.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.kitten.id)}
                        className="p-1 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary">${getTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="space-y-2">
                  <Button onClick={handleCheckout} className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Proceder con la Adopción
                  </Button>
                  <Button variant="outline" onClick={clearCart} className="w-full">
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;