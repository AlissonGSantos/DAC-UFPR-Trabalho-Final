import { AirplaneTakeoff, AirplaneLanding } from "phosphor-react";

interface BookingCardProps {
  title: string;
  items: {
    label: string;
    value: string;
  }[];
  isVertical?: boolean;
}

const BookingCard = ({ title, items, isVertical = false }: BookingCardProps) => {
  return (
    <div className={`bg-slate-700 rounded-lg p-6 ${isVertical ? 'flex flex-col' : ''}`}>
      <h3 className="text-lg text-slate-300 mb-4 border-b border-slate-600 pb-2">
        {title}
      </h3>
      
      <div className={`${isVertical ? 'space-y-3' : 'grid grid-cols-2 gap-4'}`}>
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="text-slate-300">
              {item.label.includes("Origem") || item.label.includes("Destino") ? (
                <span className="flex items-center gap-2">
                  {item.label.includes("Origem") && (
                    <AirplaneTakeoff size={16} className="text-blue-400" />
                  )}
                  {item.label.includes("Destino") && (
                    <AirplaneLanding size={16} className="text-green-400" />
                  )}
                  {item.value}
                </span>
              ) : (
                item.value
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCard;