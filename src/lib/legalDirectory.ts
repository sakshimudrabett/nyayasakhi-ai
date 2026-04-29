// Curated directory of legal aid, NGOs and women's helplines across India.
// All numbers are publicly listed government / national helplines.
export interface HelpContact {
  name: string;
  type: "legal-aid" | "ngo" | "helpline";
  phone: string;
  description: string;
  hours?: string;
}

export interface StateDirectory {
  state: string;
  contacts: HelpContact[];
}

const NATIONAL: HelpContact[] = [
  { name: "National Commission for Women", type: "helpline", phone: "7827170170",
    description: "Complaints related to women's rights, harassment, inheritance disputes.", hours: "Mon–Fri, 9 am – 6 pm" },
  { name: "Women Helpline (Universal)", type: "helpline", phone: "181",
    description: "24×7 support for any woman in distress, across India.", hours: "24×7" },
  { name: "NALSA — National Legal Services Authority", type: "legal-aid", phone: "15100",
    description: "Free legal aid and lawyers for women, scheduled castes/tribes, and rural poor.", hours: "Mon–Sat" },
  { name: "Sakhi One Stop Centre", type: "ngo", phone: "181",
    description: "Government-run shelter, medical, legal & counselling support for women.", hours: "24×7" },
];

export const DIRECTORY: StateDirectory[] = [
  { state: "Andhra Pradesh", contacts: [
      ...NATIONAL,
      { name: "AP State Legal Services Authority", type: "legal-aid", phone: "0863-2442733", description: "Free legal aid in Telugu and English." },
      { name: "Bhumika Women's Collective", type: "ngo", phone: "040-65500333", description: "Counselling and legal support for women in Telugu states." } ] },
  { state: "Assam", contacts: [
      ...NATIONAL,
      { name: "Assam State Legal Services Authority", type: "legal-aid", phone: "0361-2237034", description: "Free legal aid across districts of Assam." },
      { name: "North East Network", type: "ngo", phone: "0361-2602833", description: "Women's rights NGO active in NE India." } ] },
  { state: "Bihar", contacts: [
      ...NATIONAL,
      { name: "Bihar State Legal Services Authority", type: "legal-aid", phone: "0612-2230943", description: "Free legal aid across Bihar." },
      { name: "Adithi", type: "ngo", phone: "0612-2270188", description: "Works with rural women on rights & livelihoods." } ] },
  { state: "Chhattisgarh", contacts: [
      ...NATIONAL,
      { name: "Chhattisgarh SLSA", type: "legal-aid", phone: "0771-2510388", description: "Free legal aid, panel lawyers in Hindi." } ] },
  { state: "Delhi", contacts: [
      ...NATIONAL,
      { name: "Delhi State Legal Services Authority", type: "legal-aid", phone: "011-23386313", description: "Free legal aid in Delhi NCR." },
      { name: "Jagori", type: "ngo", phone: "011-26692700", description: "Women's resource & training centre." } ] },
  { state: "Gujarat", contacts: [
      ...NATIONAL,
      { name: "Gujarat State Legal Services Authority", type: "legal-aid", phone: "079-27662458", description: "Free legal aid in Gujarati." },
      { name: "AWAG (Ahmedabad Women's Action Group)", type: "ngo", phone: "079-26603453", description: "Counselling & legal aid for women." } ] },
  { state: "Haryana", contacts: [
      ...NATIONAL,
      { name: "Haryana SLSA", type: "legal-aid", phone: "0172-2589734", description: "Free legal aid across Haryana." } ] },
  { state: "Himachal Pradesh", contacts: [
      ...NATIONAL,
      { name: "HP State Legal Services Authority", type: "legal-aid", phone: "0177-2620023", description: "Free legal aid in HP." } ] },
  { state: "Jharkhand", contacts: [
      ...NATIONAL,
      { name: "Jharkhand SLSA", type: "legal-aid", phone: "0651-2481520", description: "Free legal aid across Jharkhand." } ] },
  { state: "Karnataka", contacts: [
      ...NATIONAL,
      { name: "Karnataka SLSA", type: "legal-aid", phone: "080-22111714", description: "Free legal aid in Kannada." },
      { name: "Vimochana", type: "ngo", phone: "080-25492781", description: "Forum for women's rights, Bengaluru." } ] },
  { state: "Kerala", contacts: [
      ...NATIONAL,
      { name: "Kerala SLSA", type: "legal-aid", phone: "0471-2334411", description: "Free legal aid in Malayalam." },
      { name: "Sakhi Resource Centre", type: "ngo", phone: "0471-2722294", description: "Women's rights & research, Thiruvananthapuram." } ] },
  { state: "Madhya Pradesh", contacts: [
      ...NATIONAL,
      { name: "MP State Legal Services Authority", type: "legal-aid", phone: "0755-2550155", description: "Free legal aid across MP." } ] },
  { state: "Maharashtra", contacts: [
      ...NATIONAL,
      { name: "Maharashtra SLSA", type: "legal-aid", phone: "022-22691395", description: "Free legal aid in Marathi/Hindi/English." },
      { name: "Majlis Legal Centre", type: "ngo", phone: "022-26661252", description: "Legal support for women, Mumbai." } ] },
  { state: "Odisha", contacts: [
      ...NATIONAL,
      { name: "Odisha SLSA", type: "legal-aid", phone: "0674-2589545", description: "Free legal aid in Odia." } ] },
  { state: "Punjab", contacts: [
      ...NATIONAL,
      { name: "Punjab SLSA", type: "legal-aid", phone: "0172-2741336", description: "Free legal aid in Punjabi." } ] },
  { state: "Rajasthan", contacts: [
      ...NATIONAL,
      { name: "Rajasthan SLSA", type: "legal-aid", phone: "0141-2227481", description: "Free legal aid across Rajasthan." },
      { name: "Vishakha", type: "ngo", phone: "0141-2621243", description: "Women's rights NGO, Jaipur." } ] },
  { state: "Tamil Nadu", contacts: [
      ...NATIONAL,
      { name: "TN State Legal Services Authority", type: "legal-aid", phone: "044-25342790", description: "Free legal aid in Tamil." },
      { name: "PCVC (Prajnya)", type: "ngo", phone: "044-43111143", description: "Gender violence support, Chennai." } ] },
  { state: "Telangana", contacts: [
      ...NATIONAL,
      { name: "Telangana SLSA", type: "legal-aid", phone: "040-23446723", description: "Free legal aid in Telugu." } ] },
  { state: "Uttar Pradesh", contacts: [
      ...NATIONAL,
      { name: "UP State Legal Services Authority", type: "legal-aid", phone: "0522-2728855", description: "Free legal aid across UP." },
      { name: "AALI (Association for Advocacy & Legal Initiatives)", type: "ngo", phone: "0522-2310520", description: "Women's legal rights, Lucknow." } ] },
  { state: "Uttarakhand", contacts: [
      ...NATIONAL,
      { name: "Uttarakhand SLSA", type: "legal-aid", phone: "0135-2666238", description: "Free legal aid across the state." } ] },
  { state: "West Bengal", contacts: [
      ...NATIONAL,
      { name: "WB State Legal Services Authority", type: "legal-aid", phone: "033-22483892", description: "Free legal aid in Bengali." },
      { name: "Swayam", type: "ngo", phone: "033-24863367", description: "Women's rights & violence support, Kolkata." } ] },
];
