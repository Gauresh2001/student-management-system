import { useNavigate } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white shadow-sm">
      <EmptyState
        icon={CompassIcon}
        title="Page not found"
        message="The page you're looking for doesn't exist."
        action={<Button size="sm" onClick={() => navigate('/students')}>Go to Students</Button>}
      />
    </div>
  );
}
