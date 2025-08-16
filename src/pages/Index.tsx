import React, { useState, useMemo } from 'react';
import { kittens } from '@/data/kittens';
import { Kitten } from '@/types/kitten';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import KittenCard from '@/components/KittenCard';
import KittenDetailsModal from '@/components/KittenDetailsModal';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  console.log('Rendering Index page with', kittens.length, 'kittens');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [showVaccinatedOnly, setShowVaccinatedOnly] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [selectedKitten, setSelectedKitten] = useState<Kitten | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredKittens = useMemo(() => {
    console.log('Filtering kittens with criteria:', {
      searchTerm,
      selectedBreed,
      selectedGender,
      selectedAge,
      showVaccinatedOnly,
      showAvailableOnly
    });

    return kittens.filter(kitten => {
      const matchesSearch = kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kitten.breed.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBreed = selectedBreed === 'all' || kitten.breed === selectedBreed;
      const matchesGender = selectedGender === 'all' || kitten.gender === selectedGender;
      const matchesAge = selectedAge === 'all' || 
                        (selectedAge === '5+' ? kitten.age >= 5 : kitten.age.toString() === selectedAge);
      const matchesVaccinated = !showVaccinatedOnly || kitten.vaccinated;
      const matchesAvailable = !showAvailableOnly || kitten.available;

      return matchesSearch && matchesBreed && matchesGender && 
             matchesAge && matchesVaccinated && matchesAvailable;
    });
  }, [searchTerm, selectedBreed, selectedGender, selectedAge, showVaccinatedOnly, showAvailableOnly]);

  const handleViewDetails = (kitten: Kitten) => {
    console.log('Opening details for kitten:', kitten.name);
    setSelectedKitten(kitten);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing kitten details modal');
    setIsModalOpen(false);
    setSelectedKitten(null);
  };

  const clearFilters = () => {
    console.log('Clearing all filters');
    setSearchTerm('');
    setSelectedBreed('all');
    setSelectedGender('all');
    setSelectedAge('all');
    setShowVaccinatedOnly(false);
    setShowAvailableOnly(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Encuentra tu compañero perfecto</h2>
            <p className="text-muted-foreground">
              Descubre gatitos adorables esperando un hogar lleno de amor
            </p>
          </div>

          <div className="mb-6">
            <Filters
              selectedBreed={selectedBreed}
              selectedGender={selectedGender}
              selectedAge={selectedAge}
              showVaccinatedOnly={showVaccinatedOnly}
              showAvailableOnly={showAvailableOnly}
              onBreedChange={setSelectedBreed}
              onGenderChange={setSelectedGender}
              onAgeChange={setSelectedAge}
              onVaccinatedChange={setShowVaccinatedOnly}
              onAvailableChange={setShowAvailableOnly}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredKittens.length} de {kittens.length} gatitos
            </p>
          </div>

          {filteredKittens.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐱</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron gatitos</h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar tus filtros para ver más opciones
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredKittens.map((kitten) => (
                <KittenCard
                  key={kitten.id}
                  kitten={kitten}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </main>

        <KittenDetailsModal
          kitten={selectedKitten}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </CartProvider>
  );
};

export default Index;