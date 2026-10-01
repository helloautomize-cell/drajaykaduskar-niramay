import type { ComponentType, SVGProps } from "react";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Baby,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock,
  ExternalLink,
  FileText,
  Footprints,
  Globe,
  GraduationCap,
  Info,
  Mail,
  MapPin,
  Menu,
  Play,
  Presentation,
  Printer,
  SquareParking,
  Stethoscope,
  Syringe,
  TriangleAlert,
  Users,
  X,
} from "lucide-react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function makeIcon(path: React.ReactNode, viewBox = "0 0 24 24") {
  return function Icon({ size = 24, strokeWidth = 1.75, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...rest}
      >
        {path}
      </svg>
    );
  };
}

/* ---- Service icons (24px grid, 1.75 stroke) ---- */

export const GlucoseDropIcon = makeIcon(
  <>
    <path d="M12 3c3 4 6 6.8 6 10.2A6 6 0 0 1 6 13.2C6 9.8 9 7 12 3z" />
    <path d="M9.2 13.4a3 3 0 0 0 2.6 3" />
  </>
);
export const InsulinPenIcon = makeIcon(
  <>
    <rect x="2.5" y="9.5" width="19" height="5" rx="2.5" />
    <path d="M7.5 9.5v5" />
    <rect x="13" y="10.7" width="4.5" height="2.6" rx="1" />
    <path d="M19.5 9.5v5" />
  </>
);
export const EyeIcon = makeIcon(
  <>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </>
);
export const KidneyIcon = makeIcon(
  <>
    <path d="M7.5 5C5.3 5 4 7.5 4 11s1.3 6 3.5 6c1.2 0 2-.8 2-2 0-1.5-1-2.4-1-4s1-2.5 1-4c0-1.2-.8-2-2-2z" />
    <path d="M16.5 5c2.2 0 3.5 2.5 3.5 6s-1.3 6-3.5 6c-1.2 0-2-.8-2-2 0-1.5 1-2.4 1-4s-1-2.5-1-4c0-1.2.8-2 2-2z" />
    <path d="M10.5 12.5c.8.3 1.5 1.2 1.5 2.5v4" />
    <path d="M13.5 12.5c-.8.3-1.5 1.2-1.5 2.5v4" />
  </>
);
export const FootIcon = Footprints;
export const ThyroidIcon = makeIcon(
  <>
    <path d="M10.5 5.5c-2.6-1.2-5-.3-5.5 2.5-.6 3.2 1.2 6.8 3.2 6.8 2 0 2.3-4.3 2.3-9.3z" />
    <path d="M13.5 5.5c2.6-1.2 5-.3 5.5 2.5.6 3.2-1.2 6.8-3.2 6.8-2 0-2.3-4.3-2.3-9.3z" />
    <path d="M12 5.5v12" />
    <path d="M5.5 20c2-.8 4.2-1.2 6.5-1.2s4.5.4 6.5 1.2" />
  </>
);
export const BpCuffIcon = makeIcon(
  <>
    <rect x="4.5" y="3.5" width="10" height="7" rx="1.5" />
    <path d="M4.5 7h10" />
    <path d="M14.5 8.5c2.4.8 3.5 2.8 3.5 5" />
    <circle cx="18.5" cy="16.5" r="1.8" />
    <circle cx="7.5" cy="17" r="3.5" />
    <path d="M7.5 17v-1.8" />
    <path d="M7.5 10.5v3" />
  </>
);
export const WaistTapeIcon = makeIcon(
  <>
    <circle cx="9" cy="14" r="5.5" />
    <circle cx="9" cy="14" r="1.8" />
    <path d="M14.5 14H21" />
    <path d="M16 14v-1.6M18.5 14v-1.6M21 14v-1.6" />
  </>
);
export const NutritionPlateIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="6.5" />
    <circle cx="12" cy="12" r="3" />
    <path d="M3 6v2.2M4.1 6v2.2M5.2 6v2.2" />
    <path d="M4.1 8.2V19" />
    <path d="M19.9 5.5c-1 0-1.8 1.2-1.8 2.6s.8 2.6 1.8 2.6 1.8-1.2 1.8-2.6-.8-2.6-1.8-2.6z" />
    <path d="M19.9 10.7V19" />
  </>
);
export const HeartIcon = makeIcon(
  <>
    <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" />
    <path d="M5 12h3l1.4-2.4 2.1 4.4 1.4-2h4.1" />
  </>
);
export const EcgIcon = makeIcon(
  <path d="M3 12h4l2-5 3.5 9L15 12h6" />
);
export const EchoIcon = makeIcon(
  <>
    <path d="M6 3l9.5 13" />
    <path d="M13.5 14.5l3 4" />
    <path d="M16 19.5a4 4 0 0 0 4-4" />
    <path d="M18.5 22.5a7.5 7.5 0 0 0 2.5-14.5" transform="translate(-2 1)" />
  </>
);
export const TmtIcon = makeIcon(
  <>
    <path d="M3.5 17.5l15-4.5" />
    <path d="M5.5 17.2v2.5M16.5 13.9v3.4" />
    <path d="M18.5 13l3-1V7.5" />
    <circle cx="11.5" cy="4.5" r="1.5" />
    <path d="M11 6.5l-1.5 3.5 2.8 1.2.6 2.8" />
    <path d="M9.7 9.8l-2.7 1M9.7 9.8l2.8-1.8" />
  </>
);
export const PregnancyIcon = makeIcon(
  <>
    <circle cx="10.5" cy="4.8" r="2.4" />
    <path d="M7.5 9.2c1.6-.9 3.9-.8 5.3.5 1.7 1.6 2.2 4.3 1.2 6.3-.6 1.2-1.8 1.9-3.2 2-.5 1-1 2.1-1.5 3" />
    <path d="M6.5 21h10" />
  </>
);
export const ScaleIcon = makeIcon(
  <>
    <rect x="4.5" y="4" width="15" height="16" rx="3" />
    <path d="M8.5 11a3.5 3.5 0 0 1 7 0z" />
    <path d="M12 10.6V8.6" />
    <path d="M9 15.5h.01M12 15.5h.01M15 15.5h.01" />
  </>
);
export const MuscleIcon = makeIcon(
  <>
    <path d="M4.5 19.5c-.5-4 1-8.5 4-11C10.5 6.8 13.5 6 15.5 7.2c1.4.9 1.6 2.3.6 3.3" />
    <path d="M16.1 10.5c2.2.3 3.9 1.9 3.9 4 0 2.8-2.2 5-5 5H9" />
    <path d="M4.5 19.5h10" />
  </>
);
export const CheckupIcon = ClipboardCheck;
export const BabyIcon = Baby;
export const VaccineIcon = Syringe;
export const TeenIcon = makeIcon(
  <>
    <circle cx="8.5" cy="7" r="2.8" />
    <circle cx="15.5" cy="8.5" r="2.4" />
    <path d="M4 20c0-3.5 2-5.5 4.5-5.5S13 16.5 13 20" />
    <path d="M13.6 14.9c2.5-.3 4.4 1.4 4.4 5.1" />
  </>
);
export const MindIcon = makeIcon(
  <>
    <path d="M9 20.5v-2.4A6 6 0 0 1 5.5 12a6.5 6.5 0 1 1 13 0c0 1.5-.5 2.7-1.3 3.7-.6.8-.7 1.4-.7 2.3v2.5h-3V20" />
    <path d="M12 14.6s-2.7-1.6-2.7-3.6a1.55 1.55 0 0 1 2.7-1 1.55 1.55 0 0 1 2.7 1c0 2-2.7 3.6-2.7 3.6z" />
  </>
);
export const CompassIcon = makeIcon(
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
  </>
);
export const WorkshopIcon = Presentation;
export const TrainedIcon = GraduationCap;
export const CalendarCheckIcon = CalendarCheck;
export const LabIcon = makeIcon(
  <>
    <path d="M9 3h6" />
    <path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
    <path d="M7.5 15h9" />
  </>
);
export const HomeCollectionIcon = makeIcon(
  <>
    <path d="M3 11l9-7 9 7" />
    <path d="M6 10v10h12V10" />
    <path d="M12 13v5M9.5 15.5h5" />
  </>
);
export const PharmacyIcon = makeIcon(
  <>
    <path d="M9 3h6v4H9z" />
    <path d="M8.5 7h7l.5 12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2L8.5 7z" />
    <path d="M10.8 12.5h2.4M12 11.3v2.4" />
  </>
);
export const ParcelIcon = makeIcon(
  <>
    <rect x="4" y="7" width="16" height="12" rx="2" />
    <path d="M9 7V4h6v3" />
    <path d="M9 12h6" />
  </>
);
export const SpecialistIcon = Stethoscope;
export const TeamIcon = Users;

/* ---- Interface icons ---- */

export const CalendarIcon = makeIcon(
  <>
    <path d="M5 6.5h14v12H5z" />
    <path d="M8 4v4M16 4v4M5 10.5h14" />
  </>
);
export const ClockIcon = Clock;
export const PhoneIcon = makeIcon(
  <path d="M7 4h3l1.5 4-2 1.5a13 13 0 0 0 5 5L16 13l4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 5 6a2 2 0 0 1 2-2z" />
);
export const WhatsAppIcon = makeIcon(
  <>
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5z" />
    <path
      d="M9.2 8.4c-.4 0-.8.3-1 .8-.4 1 .2 2.6 1.5 4 1.4 1.5 3.1 2.3 4.4 2 .5-.2.9-.6 1-1.1l-1.7-.9-.9.8c-1-.5-1.8-1.3-2.3-2.3l.9-.9-1.9-2.5z"
      fill="currentColor"
      stroke="none"
    />
  </>
);
export const ArrowIcon = makeIcon(<path d="M5 12h13M13 6l6 6-6 6" />);
export const ChevronIcon = makeIcon(<path d="M8 10l4 4 4-4" />);
export const ChevronLeftIcon = makeIcon(<path d="M14.5 6l-6 6 6 6" />);
export const ChevronRightIcon = makeIcon(<path d="M9.5 6l6 6-6 6" />);
export const EmergencyIcon = TriangleAlert;
export const InfoIcon = Info;
export const MenuIcon = Menu;
export const CloseIcon = X;
export const CheckIcon = Check;
export const ArrowLeftIcon = ArrowLeft;
export const ArrowRightIcon = ArrowRight;
export const ChevronDownIcon = ChevronDown;
export const ChevronRightLucide = ChevronRight;
export const MapPinIcon = MapPin;
export const MailIcon = Mail;
export const PlayIcon = Play;
export const FileTextIcon = FileText;
export const PrinterIcon = Printer;
export const GlobeIcon = Globe;
export const ExternalLinkIcon = ExternalLink;
export const WheelchairIcon = Accessibility;
export const ParkingIcon = SquareParking;
export const LiftIcon = makeIcon(
  <>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M12 3v18" />
    <path d="M9 10l-1.5 1.5M9 10l1.5 1.5M15 14l-1.5-1.5M15 14l1.5-1.5" />
  </>
);

export type IconComponent = ComponentType<{
  size?: number;
  className?: string;
  strokeWidth?: number;
}>;

/** Name registry for the styleguide icon grid and programmatic lookup. */
export const iconSet: Record<string, IconComponent> = {
  "glucose-drop": GlucoseDropIcon,
  "insulin-pen": InsulinPenIcon,
  eye: EyeIcon,
  kidney: KidneyIcon,
  foot: FootIcon,
  thyroid: ThyroidIcon,
  "bp-cuff": BpCuffIcon,
  "waist-tape": WaistTapeIcon,
  "nutrition-plate": NutritionPlateIcon,
  heart: HeartIcon,
  ecg: EcgIcon,
  echo: EchoIcon,
  treadmill: TmtIcon,
  pregnancy: PregnancyIcon,
  "body-scale": ScaleIcon,
  muscle: MuscleIcon,
  "check-up": CheckupIcon,
  baby: BabyIcon,
  vaccine: VaccineIcon,
  "teen-pair": TeenIcon,
  mind: MindIcon,
  compass: CompassIcon,
  workshop: WorkshopIcon,
  trained: TrainedIcon,
  "lab-flask": LabIcon,
  "home-collection": HomeCollectionIcon,
  pharmacy: PharmacyIcon,
  parcel: ParcelIcon,
  specialist: SpecialistIcon,
  team: TeamIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  phone: PhoneIcon,
  whatsapp: WhatsAppIcon,
  "arrow-right": ArrowIcon,
  chevron: ChevronIcon,
  "chevron-left": ChevronLeftIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-down": ChevronDownIcon,
  menu: MenuIcon,
  close: CloseIcon,
  check: CheckIcon,
  "arrow-left": ArrowLeftIcon,
  "map-pin": MapPinIcon,
  mail: MailIcon,
  play: PlayIcon,
  "file-text": FileTextIcon,
  printer: PrinterIcon,
  globe: GlobeIcon,
  "external-link": ExternalLinkIcon,
  emergency: EmergencyIcon,
  info: InfoIcon,
  wheelchair: WheelchairIcon,
  parking: ParkingIcon,
  lift: LiftIcon,
};
