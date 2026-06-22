export const monthlyDonations = [
  { month: "Jan", donations: 32 },
  { month: "Feb", donations: 58 },
  { month: "Mar", donations: 87 },
  { month: "Apr", donations: 135 },
  { month: "May", donations: 192 },
  { month: "Jun", donations: 247 },
];

export const categoryDistribution = [
  { name: "Electronics", value: 30 },
  { name: "Books", value: 25 },
  { name: "Furniture", value: 20 },
  { name: "Appliances", value: 15 },
  { name: "Others", value: 10 },
];

export const impactByCategory = [
  { category: "Electronics", co2: 1620, items: 74 },
  { category: "Books", co2: 380, items: 62 },
  { category: "Furniture", co2: 1240, items: 49 },
  { category: "Appliances", co2: 920, items: 37 },
  { category: "Others", co2: 140, items: 25 },
];

export const recentDonations = [
  { id: 1, name: "Dell Latitude Laptop", location: "Bengaluru, KA", condition: "Excellent", category: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80" },
  { id: 2, name: "Lenovo ThinkPad", location: "Pune, MH", condition: "Good", category: "Electronics", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80" },
  { id: 3, name: "NCERT Book Set", location: "Delhi NCR", condition: "Excellent", category: "Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80" },
  { id: 4, name: "Wooden Study Table", location: "Hyderabad, TS", condition: "Good", category: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" },
  { id: 5, name: "Office Chair", location: "Mumbai, MH", condition: "Fair", category: "Furniture", image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80" },
  { id: 6, name: "HP Printer", location: "Chennai, TN", condition: "Good", category: "Electronics", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&q=80" },
  { id: 7, name: "Microwave Oven", location: "Ahmedabad, GJ", condition: "Excellent", category: "Appliances", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80" },
  { id: 8, name: "School Bags (12)", location: "Kolkata, WB", condition: "New", category: "Others", image: "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=600&q=80" },
];

export type Organization = {
  id: number;
  name: string;
  type: "School" | "NGO" | "Shelter";
  location: string;
  description: string;
  banner: string;
  needs: { item: string; qty: number; tag: string }[];
  children: number;
  urgency: "High" | "Medium" | "Low";
};

export const organizations: Organization[] = [
  { id: 1, name: "Sunrise School", type: "School", location: "Bengaluru, KA", description: "Government-aided school running a new computer lab for 400+ underprivileged students.", banner: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80", needs: [{ item: "Laptops", qty: 5, tag: "Electronics" }, { item: "Books", qty: 120, tag: "Books" }, { item: "Study tables", qty: 8, tag: "Furniture" }], children: 412, urgency: "High" },
  { id: 2, name: "Community Shelter", type: "Shelter", location: "Delhi NCR", description: "Night shelter providing food, beds and clothing to 180 homeless residents year-round.", banner: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80", needs: [{ item: "Blankets", qty: 60, tag: "Others" }, { item: "Microwaves", qty: 2, tag: "Appliances" }, { item: "Chairs", qty: 20, tag: "Furniture" }], children: 180, urgency: "High" },
  { id: 3, name: "Hope Foundation", type: "NGO", location: "Mumbai, MH", description: "Rehabilitation NGO supporting survivors of domestic violence with shelter and skills training.", banner: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=900&q=80", needs: [{ item: "Sewing machines", qty: 4, tag: "Appliances" }, { item: "Books", qty: 80, tag: "Books" }, { item: "Laptops", qty: 3, tag: "Electronics" }], children: 95, urgency: "Medium" },
  { id: 4, name: "Learning Hub", type: "NGO", location: "Hyderabad, TS", description: "After-school digital learning center for first-generation learners in Telangana.", banner: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80", needs: [{ item: "Tablets", qty: 10, tag: "Electronics" }, { item: "Printers", qty: 2, tag: "Electronics" }, { item: "Desks", qty: 15, tag: "Furniture" }], children: 230, urgency: "High" },
  { id: 5, name: "Rural Education Trust", type: "NGO", location: "Jaipur, RJ", description: "Bringing structured education to 12 villages across rural Rajasthan.", banner: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900&q=80", needs: [{ item: "NCERT Sets", qty: 200, tag: "Books" }, { item: "School bags", qty: 150, tag: "Others" }], children: 540, urgency: "Medium" },
  { id: 6, name: "Shiksha Foundation", type: "NGO", location: "Lucknow, UP", description: "Empowering girl-child education through scholarships and learning material.", banner: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80", needs: [{ item: "Books", qty: 300, tag: "Books" }, { item: "Laptops", qty: 6, tag: "Electronics" }], children: 320, urgency: "Medium" },
  { id: 7, name: "Women Empowerment NGO", type: "NGO", location: "Pune, MH", description: "Skill-development and micro-entrepreneurship programs for women from low-income communities.", banner: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80", needs: [{ item: "Sewing machines", qty: 8, tag: "Appliances" }, { item: "Laptops", qty: 4, tag: "Electronics" }], children: 140, urgency: "Low" },
  { id: 8, name: "City Library Initiative", type: "NGO", location: "Chennai, TN", description: "Free public reading rooms run in partnership with the city corporation.", banner: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=80", needs: [{ item: "Books", qty: 500, tag: "Books" }, { item: "Study tables", qty: 12, tag: "Furniture" }], children: 1200, urgency: "Low" },
  { id: 9, name: "Skill Development Center", type: "NGO", location: "Ahmedabad, GJ", description: "Vocational training in IT, electrical and tailoring for youth aged 16–24.", banner: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&q=80", needs: [{ item: "Laptops", qty: 12, tag: "Electronics" }, { item: "Printers", qty: 3, tag: "Electronics" }], children: 210, urgency: "High" },
  { id: 10, name: "Bright Future Academy", type: "School", location: "Kolkata, WB", description: "Low-fee private school serving 600 students with a focus on STEM education.", banner: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&q=80", needs: [{ item: "Microwaves", qty: 2, tag: "Appliances" }, { item: "Books", qty: 220, tag: "Books" }, { item: "Chairs", qty: 30, tag: "Furniture" }], children: 600, urgency: "Medium" },
  { id: 11, name: "Helping Hands NGO", type: "NGO", location: "Bhopal, MP", description: "Distributes essentials to migrant families and runs a free community kitchen.", banner: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80", needs: [{ item: "Appliances", qty: 6, tag: "Appliances" }, { item: "Furniture", qty: 18, tag: "Furniture" }], children: 260, urgency: "Medium" },
  { id: 12, name: "Youth Shelter", type: "Shelter", location: "Indore, MP", description: "Transitional shelter and counseling for at-risk teenagers and young adults.", banner: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=900&q=80", needs: [{ item: "Beds", qty: 12, tag: "Furniture" }, { item: "Books", qty: 80, tag: "Books" }, { item: "Laptops", qty: 4, tag: "Electronics" }], children: 75, urgency: "High" },
];

export const matchedRecipients = [
  { id: 1, name: "Sunrise School", score: 98, note: "Needs laptops for new computer lab.", urgency: "High", location: "Bengaluru, KA" },
  { id: 4, name: "Learning Hub", score: 95, note: "Digital learning center for 230 students.", urgency: "High", location: "Hyderabad, TS" },
  { id: 3, name: "Hope Foundation", score: 91, note: "Women rehabilitation NGO needs IT for skills training.", urgency: "Medium", location: "Mumbai, MH" },
  { id: 2, name: "Community Shelter", score: 88, note: "Tech literacy program for shelter residents.", urgency: "High", location: "Delhi NCR" },
];
