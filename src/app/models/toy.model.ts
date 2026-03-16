export interface ToyType {
  typeId: number;
  name: string;
}
export interface AgeGroup {
  ageGroupId: number;
  name: string;
}
export interface ToyModel {
  toyId: number;               
  name: string;            
  description: string;      
  //type: string;     
  type: ToyType;
  ageGroup: AgeGroup;        
  targetGroup: 'svi' | 'dečak' | 'devojčica'; 
  productionDate: string;  
  price: number;            
  imageUrl: string;         
  rating: number;           
  
   
  status?: 'rezervisano' | 'pristiglo' | 'otkazano'; 
  userReview?: string;      
}