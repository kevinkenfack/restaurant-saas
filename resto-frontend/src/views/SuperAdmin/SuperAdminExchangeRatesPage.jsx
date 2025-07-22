import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { getExchangeRates, updateExchangeRate, addExchangeRate, deleteExchangeRate } from '../../controllers/superadmin.controller';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { IconTrash, IconPlus, IconDeviceFloppy } from '@tabler/icons-react';

export default function SuperAdminExchangeRatesPage() {
  const { t } = useTranslation();
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newCurrency, setNewCurrency] = useState('');
  const [newRate, setNewRate] = useState('');

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await getExchangeRates();
      setRates(res.data);
    } catch {
      toast.error('Erreur lors du chargement des taux');
    }
    setLoading(false);
  };

  const handleRateChange = (index, value) => {
    const newRates = [...rates];
    newRates[index].rate_to_usd = value;
    setRates(newRates);
  };

  const handleSave = async (rate) => {
    setSaving(true);
    try {
      await updateExchangeRate(rate.currency_code, rate.rate_to_usd);
      toast.success('Taux mis à jour !');
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
    setSaving(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCurrency || !newRate) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    setAdding(true);
    try {
      await addExchangeRate(newCurrency.toUpperCase(), newRate);
      toast.success('Devise ajoutée !');
      setNewCurrency('');
      setNewRate('');
      fetchRates();
    } catch {
      toast.error('Erreur lors de l\'ajout');
    }
    setAdding(false);
  };

  const handleDelete = async (currency_code) => {
    if (!window.confirm('Supprimer cette devise ?')) return;
    try {
      await deleteExchangeRate(currency_code);
      toast.success('Devise supprimée !');
      fetchRates();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (loading) return <Page>Chargement...</Page>;

  return (
    <Page className="px-4 py-6 w-full">
      <h2 className="text-2xl font-bold mb-6">{t('superadmin_exchange_rates.title') || 'Taux de change'}</h2>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-2 mb-8 items-end bg-restro-card-bg border border-restro-border-green rounded-xl p-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Devise (ex: USD)</label>
          <input
            type="text"
            maxLength={6}
            value={newCurrency}
            onChange={e => setNewCurrency(e.target.value.replace(/[^a-zA-Z]/g, ''))}
            className="rounded-lg px-3 py-2 border border-restro-border-green bg-restro-gray w-full uppercase"
            placeholder="Code devise"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Taux vers USD</label>
          <input
            type="number"
            step="any"
            min="0"
            value={newRate}
            onChange={e => setNewRate(e.target.value)}
            className="rounded-lg px-3 py-2 border border-restro-border-green bg-restro-gray w-full"
            placeholder="Taux"
            required
          />
        </div>
        <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-restro-green text-white hover:bg-restro-green-button-hover transition font-bold" disabled={adding}>
          <IconPlus size={20} /> {adding ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-[400px] w-full border border-restro-border-green rounded-xl">
          <thead>
            <tr className="bg-restro-card-bg">
              <th className="px-4 py-2 text-left">Devise</th>
              <th className="px-4 py-2 text-center">Taux vers USD</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate, i) => (
              <tr key={rate.currency_code} className="border-t border-restro-border-green">
                <td className="px-4 py-2 font-bold uppercase">{rate.currency_code}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={rate.rate_to_usd}
                    onChange={e => handleRateChange(i, e.target.value)}
                    className="rounded-lg px-3 py-2 border border-restro-border-green bg-restro-gray w-32 text-center"
                  />
                </td>
                <td className="px-4 py-2 flex gap-2 items-center justify-end">
                  <button
                    className="px-4 py-2 rounded-xl bg-restro-green text-white hover:bg-restro-green-button-hover transition flex items-center justify-center"
                    onClick={() => handleSave(rate)}
                    disabled={saving}
                    title="Enregistrer"
                  >
                    {saving ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    ) : (
                      <IconDeviceFloppy size={20} />
                    )}
                  </button>
                  <button
                    className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 transition"
                    onClick={() => handleDelete(rate.currency_code)}
                    title="Supprimer"
                  >
                    <IconTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
