// Category mapping from IDs to display labels
export const categoryLabels = {
  'web-development': 'Web Development',
  'backend-development': 'Backend Development',
  'data-science': 'Data Science',
  'machine-learning': 'Machine Learning',
  'artificial-intelligence': 'Artificial Intelligence',
  'cloud-computing': 'Cloud Computing',
  'cyber-security': 'Cyber Security',
  'mobile-development': 'Mobile Development',
  'game-development': 'Game Development',
  'software-engineering': 'Software Engineering',
  'design': 'Design',
  'devops': 'DevOps'
};

// Function to get category label from ID
export const getCategoryLabel = (categoryId) => {
  return categoryLabels[categoryId] || categoryId;
};

// Function to get category ID from label
export const getCategoryId = (categoryLabel) => {
  const entry = Object.entries(categoryLabels).find(([id, label]) => label === categoryLabel);
  return entry ? entry[0] : categoryLabel;
}; 