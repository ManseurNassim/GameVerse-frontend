import React from 'react';

interface DetailCardProps {
    title: string;
    content?: string;
    items?: string[] | null;
    type: 'text' | 'list' | 'tags' | 'text-list';
    emptyText?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ title, content, items, type, emptyText = "N/A" }) => {
    const isEmpty = !content && (!items || items.length === 0);

    return (
        <div className="bg-[#1c1e22] rounded-lg border border-gray-800 overflow-hidden shadow-md flex flex-col">
            <div className="bg-[#15171a] border-b border-gray-800 px-3 py-2 text-center">
                <span className="text-blue-500 font-bold text-[10px] md:text-sm uppercase tracking-wide">{title}</span>
            </div>
            <div className="p-3 flex items-center justify-center text-center flex-1 bg-[#22262a]/30 min-h-[50px] md:min-h-[80px]">
                {isEmpty ? (
                    <span className="text-gray-600 italic text-xs md:text-sm">{emptyText}</span>
                ) : (
                    <>
                        {type === 'text' && <span className="text-white font-medium text-xs md:text-base">{content}</span>}
                        
                        {type === 'list' && (
                            <div className="flex flex-col gap-1">
                                {items?.map((item, idx) => (
                                    <span key={idx} className="text-white font-medium text-xs md:text-base">{item}</span>
                                ))}
                            </div>
                        )}

                        {type === 'text-list' && (
                             <span className="text-white font-medium text-xs md:text-base">{items?.join(', ')}</span>
                        )}

                        {type === 'tags' && (
                            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                                {items?.map((item, idx) => (
                                    <span key={idx} className="bg-[#2a2f35] text-gray-300 text-[9px] md:text-xs font-bold px-2 py-1 rounded border border-gray-700">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailCard;