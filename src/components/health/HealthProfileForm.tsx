
import React, { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { BloodGroup, Genotype, ChronicCondition, DietaryPreference, HealthProfile } from '../../lib/types';

interface HealthProfileFormProps {
  initialProfile?: Partial<HealthProfile>;
  onSubmit: (profile: Partial<HealthProfile>) => void;
  className?: string;
}

const HealthProfileForm: React.FC<HealthProfileFormProps> = ({
  initialProfile,
  onSubmit,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<HealthProfile>>(
    initialProfile || {
      bloodGroup: undefined,
      genotype: undefined,
      chronicConditions: [],
      biomarkers: [],
      dietaryPreferences: [],
      culturalPreferences: [],
    }
  );
  
  const [tempCondition, setTempCondition] = useState<Partial<ChronicCondition>>({});
  const [tempPreference, setTempPreference] = useState<Partial<DietaryPreference>>({});
  
  const bloodGroupOptions: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genotypeOptions: Genotype[] = ['AA', 'AS', 'SS', 'AC', 'SC', 'CC', 'Other', 'Unknown'];
  const dietaryTypes = ['Preference', 'Allergy', 'Intolerance', 'Religious', 'Ethical'];
  
  const handleBloodGroupChange = (value: BloodGroup) => {
    setFormData(prev => ({ ...prev, bloodGroup: value }));
  };
  
  const handleGenotypeChange = (value: Genotype) => {
    setFormData(prev => ({ ...prev, genotype: value }));
  };
  
  const handleAddCondition = () => {
    if (!tempCondition.name) return;
    
    const newCondition: ChronicCondition = {
      id: crypto.randomUUID(),
      name: tempCondition.name || '',
      description: tempCondition.description,
      severity: tempCondition.severity as any,
      managementTips: tempCondition.managementTips,
    };
    
    setFormData(prev => ({
      ...prev,
      chronicConditions: [...(prev.chronicConditions || []), newCondition],
    }));
    
    setTempCondition({});
  };
  
  const handleRemoveCondition = (id: string) => {
    setFormData(prev => ({
      ...prev,
      chronicConditions: (prev.chronicConditions || []).filter(c => c.id !== id),
    }));
  };
  
  const handleAddPreference = () => {
    if (!tempPreference.name || !tempPreference.type) return;
    
    const newPreference: DietaryPreference = {
      id: crypto.randomUUID(),
      name: tempPreference.name || '',
      type: tempPreference.type as any,
      description: tempPreference.description,
      avoidIngredients: tempPreference.avoidIngredients,
    };
    
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: [...(prev.dietaryPreferences || []), newPreference],
    }));
    
    setTempPreference({});
  };
  
  const handleRemovePreference = (id: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: (prev.dietaryPreferences || []).filter(p => p.id !== id),
    }));
  };
  
  const handleCulturalPreference = (value: string) => {
    const currentPreferences = formData.culturalPreferences || [];
    
    if (currentPreferences.includes(value)) {
      setFormData(prev => ({
        ...prev,
        culturalPreferences: currentPreferences.filter(p => p !== value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        culturalPreferences: [...currentPreferences, value],
      }));
    }
  };
  
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success('Health profile updated successfully');
  };
  
  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };
  
  return (
    <div className={`glass p-6 rounded-2xl ${className}`}>
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Health Profile</h2>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                idx + 1 <= currentStep
                  ? 'bg-health-600 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
        <div className="relative h-1 w-full bg-gray-200 rounded-full mb-6">
          <motion.div
            className="absolute top-0 left-0 h-full bg-health-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <motion.div
          key={`step-${currentStep}`}
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg mb-4">Basic Health Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Blood Group</label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodGroupOptions.map(group => (
                      <button
                        key={group}
                        type="button"
                        className={`py-2 px-4 rounded-md text-sm ${
                          formData.bloodGroup === group
                            ? 'bg-health-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleBloodGroupChange(group)}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Genotype</label>
                  <div className="grid grid-cols-4 gap-2">
                    {genotypeOptions.map(type => (
                      <button
                        key={type}
                        type="button"
                        className={`py-2 px-4 rounded-md text-sm ${
                          formData.genotype === type
                            ? 'bg-health-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleGenotypeChange(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg mb-4">Health Conditions</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {formData.chronicConditions?.map(condition => (
                    <div key={condition.id} className="p-3 bg-gray-50 rounded-lg flex justify-between">
                      <div>
                        <p className="font-medium">{condition.name}</p>
                        {condition.severity && (
                          <p className="text-sm text-gray-500">Severity: {condition.severity}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveCondition(condition.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Add Condition</h4>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Condition name"
                      className="w-full p-2 border rounded-md"
                      value={tempCondition.name || ''}
                      onChange={e => setTempCondition(prev => ({ ...prev, name: e.target.value }))}
                    />
                    
                    <select
                      className="w-full p-2 border rounded-md"
                      value={tempCondition.severity || ''}
                      onChange={e => 
                        setTempCondition(prev => ({ 
                          ...prev, 
                          severity: e.target.value as any 
                        }))
                      }
                    >
                      <option value="">Select severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                    
                    <textarea
                      placeholder="Description (optional)"
                      className="w-full p-2 border rounded-md"
                      value={tempCondition.description || ''}
                      onChange={e => 
                        setTempCondition(prev => ({ 
                          ...prev, 
                          description: e.target.value 
                        }))
                      }
                    />
                    
                    <button
                      type="button"
                      className="w-full py-2 px-4 bg-health-600 text-white rounded-md hover:bg-health-700"
                      onClick={handleAddCondition}
                    >
                      Add Condition
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="font-medium text-lg mb-4">Dietary & Cultural Preferences</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {formData.dietaryPreferences?.map(preference => (
                    <div key={preference.id} className="p-3 bg-gray-50 rounded-lg flex justify-between">
                      <div>
                        <p className="font-medium">{preference.name}</p>
                        <p className="text-sm text-gray-500">{preference.type}</p>
                      </div>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemovePreference(preference.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="glass p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Add Dietary Preference</h4>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Preference name"
                      className="w-full p-2 border rounded-md"
                      value={tempPreference.name || ''}
                      onChange={e => setTempPreference(prev => ({ ...prev, name: e.target.value }))}
                    />
                    
                    <select
                      className="w-full p-2 border rounded-md"
                      value={tempPreference.type || ''}
                      onChange={e => 
                        setTempPreference(prev => ({ 
                          ...prev, 
                          type: e.target.value as any 
                        }))
                      }
                    >
                      <option value="">Select type</option>
                      {dietaryTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    
                    <textarea
                      placeholder="Ingredients to avoid (comma separated)"
                      className="w-full p-2 border rounded-md"
                      value={tempPreference.avoidIngredients?.join(', ') || ''}
                      onChange={e => 
                        setTempPreference(prev => ({ 
                          ...prev, 
                          avoidIngredients: e.target.value.split(',').map(i => i.trim()) 
                        }))
                      }
                    />
                    
                    <button
                      type="button"
                      className="w-full py-2 px-4 bg-health-600 text-white rounded-md hover:bg-health-700"
                      onClick={handleAddPreference}
                    >
                      Add Preference
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Cultural Food Preferences</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Asian', 'African', 'Mediterranean', 'European', 
                      'Latin American', 'Middle Eastern', 'Indian', 'Vegan'
                    ].map(culture => (
                      <button
                        key={culture}
                        type="button"
                        className={`py-2 px-4 rounded-md text-sm ${
                          (formData.culturalPreferences || []).includes(culture)
                            ? 'bg-health-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleCulturalPreference(culture)}
                      >
                        {culture}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              className="py-2 px-6 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={prevStep}
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              className="py-2 px-6 bg-health-600 text-white rounded-md hover:bg-health-700"
              onClick={nextStep}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-6 bg-health-600 text-white rounded-md hover:bg-health-700"
            >
              Save Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HealthProfileForm;
