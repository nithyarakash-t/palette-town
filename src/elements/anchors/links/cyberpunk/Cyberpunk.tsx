import { Link } from 'react-router-dom';
import './Cyberpunk.scss';

interface CyberpunkLinkProps {
  content?: string;
  tag?: string;
  alternate?: boolean;
  href: string;
}

export function CyberpunkLink({
  content = 'Cyber',
  tag = 'R25',
  alternate = false,
  href,
}: CyberpunkLinkProps) {

  return (
    <Link 
      to={href}
      className={"cybr-link__wrap" + (alternate ? " -secondary" : "")}
      target='_blank'
    >
      {content}<span aria-hidden="true">_</span>
      <span aria-hidden="true" className="cybr-link__glitch">{content}_</span>
      <span aria-hidden="true" className="cybr-link__tag">{tag}</span>
    </Link>
  );
}