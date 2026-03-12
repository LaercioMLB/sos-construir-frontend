import type {
  BaseSection,
  WorkGallerySection,
  ProcessSection,
  FinalCtaSection,
  FAQSection,
  WhyChooseUsSection,
  Tag,
} from './sections'
import type Meta from './meta'

export interface ServiceHeroSection extends BaseSection {
  image: string
}

export interface PartnerSection extends BaseSection {
  partnerName: string
  logo: string
  description: string
  tags: Tag[]
  cta: string
  footerInfo: {
    usage: string
    guarantee: string
  }
  coverImage: string
}

export interface ServicePartnerSection extends BaseSection {
  partnerName: string
  logo: string
  tags: string[]
  cta: string
  footerInfo: { usage: string; guarantee: string }
}

export interface ServiceSections {
  hero: ServiceHeroSection
  partner: PartnerSection
  workGallery: WorkGallerySection
  process: ProcessSection
  professionals: BaseSection
  whyChooseUs?: WhyChooseUsSection
  faq?: FAQSection
  testimonials?: BaseSection
  finalCta?: FinalCtaSection
}

export interface Service {
  meta: Meta
  sections: ServiceSections
}

export type SectionKey = keyof ServiceSections
