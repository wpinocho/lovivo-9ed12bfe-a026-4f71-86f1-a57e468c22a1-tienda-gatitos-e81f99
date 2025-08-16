import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Info } from 'lucide-react';
import { Kitten } from '@/types/kitten';
import { useCart } from '@/contexts/CartContext';

interface KittenCardProps {
  kitten: Kitten;
  onViewDetails: (kitten: Kitten) => void;
}

const KittenCard: React.FC<KittenCardProps> = ({ kitten, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log('Adding to cart:', kitten.name);
    addToCart(kitten);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={kitten.image}
          alt={kitten.name}
          className="w-full h-48 object-cover"
        />
        <Badge 
          className="absolute top-2 right-2" 
          variant={kitten.available ? "default" : "secondary"}
        >
          {kitten.available ? 'Disponible' : 'No disponible'}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-bold">{kitten.name}</span>
          <Button variant="ghost" size="sm" className="p-1">
            <Heart className="h-4 w-4" />
          </Button>
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          <p>{kitten.breed} • {kitten.age} {kitten.age === 1 ? 'año' : 'años'}</p>
          <p className="text-lg font-semibold text-primary mt-1">
            ${kitten.price.toLocaleString()}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="outline" className="text-xs">
            {kitten.color}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {kitten.gender === 'male' ? 'Macho' : 'Hembra'}
          </Badge>
          {kitten.vaccinated && (
            <Badge variant="outline" className="text-xs text-green-600">
              Vacunado
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {kitten.description}
        </p>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(kitten)}
          className="flex-1"
        >
          <Info className="h-4 w-4 mr-1" />
          Detalles
        </Button>
        <Button 
          onClick={handleAddToCart}
          disabled={!kitten.available}
          size="sm"
          className="flex-1"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Adoptar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KittenCard;