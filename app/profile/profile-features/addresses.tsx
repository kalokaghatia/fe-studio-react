import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Option, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { View } from 'react-native';

const addresses = [
  { id: '1', label: 'Casa',      street: 'Via Roma 10',      city: 'Torino',   zip: '10121' },
  { id: '2', label: 'Ufficio',   street: 'Corso Francia 25', city: 'Torino',   zip: '10138' },
  { id: '3', label: 'Magazzino', street: 'Via Milano 80',    city: 'Collegno', zip: '10093' },
];

export default function Addresses() {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <View className="flex-1 items-center  bg-background p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>I tuoi indirizzi</CardTitle>
          <CardDescription>Seleziona un indirizzo dalla lista</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(option) => setSelected(option ?? null)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleziona un indirizzo" />
            </SelectTrigger>
            <SelectContent>
              {addresses.map((address) => (
                <SelectItem key={address.id} value={address.id} label={address.label}>
                  {address.label} — {address.street}, {address.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </View>
  );
}