import { Link } from 'react-router-dom';

export default function DataPanelBlocks({ data }) {
  return data.map(({ title, value, link }, idx) => {
    return (
      <PanelWrapper link={link} key={`panel-block-${title}-${idx}`}>
        <div className="has-text-weight-medium column has-text-grey-dark	">
          {title}
        </div>
        <div className="column has-text-grey	">{value || '--'}</div>
      </PanelWrapper>
    );
  });
}

function PanelWrapper({ link, children }) {
  const panelClass = 'panel-block columns m-0 py-0';
  return link ? (
    <Link to={link} className={panelClass}>
      {children}
    </Link>
  ) : (
    <div className={panelClass}>{children}</div>
  );
}
