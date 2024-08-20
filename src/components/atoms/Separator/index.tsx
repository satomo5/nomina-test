import './style.scss';

interface SeparatorProps {
  direction?: 'horizontal' | 'vertical';
  thickness?: string;
  color?: string;
  length?: string;
  margin?: string;
}

function Separator({
  direction = 'horizontal',
  thickness = '1px',
  color = '#ccc',
  length = '100%',
  margin = '0px',
}: SeparatorProps) {
  return (
    <div
      className={`separator separator-${direction}`}
      style={{
        backgroundColor: color,
        height: direction === 'horizontal' ? thickness : length,
        width: direction === 'horizontal' ? length : thickness,
        margin: margin,
      }}
    />
  );
}

export default Separator;
