import fs from 'fs';

const files = [
  'c:\\Users\\asus0\\Parryware\\src\\components\\CardinalCollection.jsx',
  'c:\\Users\\asus0\\Parryware\\src\\components\\PraseoCollection.jsx'
];

const badgeLogic = `
                  {/* Dynamic Badges */}
                  {product.rating >= 4.9 ? (
                    <div className="absolute top-3 left-3 bg-[#FFF0E6]/95 backdrop-blur-md text-[#E36611] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#FFE0CC]">
                      <Star className="w-[10px] h-[10px] fill-[#E36611] text-[#E36611]" /> Best Seller
                    </div>
                  ) : product.price <= 3500 ? (
                    <div className="absolute top-3 left-3 bg-[#E6F4EA]/95 backdrop-blur-md text-[#1E8E3E] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#CCE8D5]">
                      <Check className="w-[10px] h-[10px] text-[#1E8E3E]" strokeWidth={3} /> Value Choice
                    </div>
                  ) : product.id % 3 === 0 ? (
                    <div className="absolute top-3 left-3 bg-[#F3E8FF]/95 backdrop-blur-md text-[#8B5CF6] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#E9D5FF]">
                      <Star className="w-[10px] h-[10px] fill-[#8B5CF6] text-[#8B5CF6]" /> New Arrival
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-[#FFF8E6]/95 backdrop-blur-md text-[#F5A623] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#FFEDCC]">
                      <Star className="w-[10px] h-[10px] fill-[#F5A623] text-[#F5A623]" /> Prime Pick
                    </div>
                  )}
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  const oldBadge = `<div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#2A2A2A] text-[11px] font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <Star className="w-[10px] h-[10px] fill-[#F5A623] text-[#F5A623]" /> Prime Pick
                  </div>`;
  
  if (content.includes(oldBadge)) {
    content = content.replace(oldBadge, badgeLogic.trim());
    fs.writeFileSync(file, content);
  }
});
console.log('Badges Diversified smoothly!');
