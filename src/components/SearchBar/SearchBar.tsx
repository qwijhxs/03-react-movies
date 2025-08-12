import { toast } from 'react-hot-toast';

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  async function handleSubmit(formData: FormData) {
    const query = formData.get('query')?.toString().trim();
    if (!query) {
      toast.error('Please enter a search query!');
      return;
    }
    onSearch(query);
  }

  return (
    <form action={handleSubmit}>
      <input
        name="query"
        type="text"
        placeholder="Search movies..."
        autoComplete="off"
      />
      <button type="submit">Search</button>
    </form>
  );
}