import Badge from '../ui/Badge';

export default function StatusBadge({ status }) {
  return <Badge color={status === 'Active' ? 'green' : 'slate'}>{status}</Badge>;
}
