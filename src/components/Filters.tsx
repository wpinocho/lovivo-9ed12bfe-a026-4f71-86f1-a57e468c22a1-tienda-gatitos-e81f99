import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface FiltersProps {
  selectedBreed: string;
  selectedGender: string;
  selectedAge: string;
  showVaccinatedOnly: boolean;
  showAvailableOnly: boolean;
  onBreedChange: (breed: string) => void;
  onGenderChange: (gender: string) => void;
  onAgeChange: (age: string) => void;
  onVaccinatedChange: (checked: boolean) => void;
  onAvailableChange: (checked: boolean) => void;
  onClearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedBreed,
  selectedGender,
  selectedAge,
  showVaccinatedOnly,
  showAvailableOnly,
  onBreedChange,
  onGenderChange,
  onAgeChange,
  onVaccinatedChange,
  onAvailableChange,
  onClearFilters,
}) => {
  const breeds = ['Persa', 'Maine Coon', 'Siamés', 'Bombay', 'Ragdoll', 'Bengalí'];
  const ages = ['1', '2', '3', '4', '5+'];

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </div>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Raza</Label>
            <Select value={selectedBreed} onValueChange={onBreedChange}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las razas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las razas</SelectItem>
                {breeds.map((breed) => (
                  <SelectItem key={breed} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Género</Label>
            <Select value={selectedGender} onValueChange={onGenderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="male">Macho</SelectItem>
                <SelectItem value="female">Hembra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Edad</Label>
            <Select value={selectedAge} onValueChange={onAgeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las edades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las edades</SelectItem>
                {ages.map((age) => (
                  <SelectItem key={age} value={age}>
                    {age} {age === '5+' ? 'años o más' : age === '1' ? 'año' : 'años'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vaccinated"
              checked={showVaccinatedOnly}
              onCheckedChange={onVaccinatedChange}
            />
            <Label htmlFor="vaccinated" className="text-sm">
              Solo vacunados
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="available"
              checked={showAvailableOnly}
              onCheckedChange={onAvailableChange}
            />
            <Label htmlFor="available" className="text-sm">
              Solo disponibles
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filters;