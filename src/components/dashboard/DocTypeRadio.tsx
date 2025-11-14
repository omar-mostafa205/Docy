import React from 'react';
import type { DocTypeOption } from '../../lib/constants';
interface DocTypeRadioProps {
  docType: DocTypeOption;
  isSelected: boolean;
  onChange: (value: string) => void;
  disabled : boolean
}

export const DocTypeRadio = ({ docType, isSelected, onChange , disabled }: DocTypeRadioProps) => {
  return (
    <label
      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-[#ff551a] bg-[#fff5f4]'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={() => !disabled && onChange(docType.value)}
      
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              isSelected ? 'border-[#ff551a]' : 'border-gray-300'
            }`}
          >
            {isSelected && <div className="w-2 h-2 rounded-full bg-[#e1754d]" />}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5 gap-2">
            <h3 className="text-gray-900 font-semibold text-sm">{docType.title}</h3>
            {docType.badge && (
              <span className="text-[#ff551a] font-medium text-xs whitespace-nowrap">
                {docType.badge}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">{docType.description}</p>
        </div>
      </div>
    </label>
  );
};