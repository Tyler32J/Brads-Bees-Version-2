import beeOnFlower from '../assets/images/bee-on-flower.webp'
import pollinationImage from '../assets/images/pollination.webp'
import hiveImage from '../assets/images/hive.webp'
import clockIcon from '../assets/images/icon-clock.webp'
import shieldIcon from '../assets/images/icon-shield.webp'
import checkIcon from '../assets/images/icon-check.webp'
import awardIcon from '../assets/images/icon-award.webp'
import plantIcon from '../assets/images/icon-plant.webp'
import arrowIcon from '../assets/images/icon-arrow.webp'
import leafIcon from '../assets/images/icon-leaf.webp'

export const serviceTabs = [
  {
    id: 'removal',
    label: 'Bee Removal',
    hero: {
      title: 'Professional Bee Removal',
      text: 'Safe, humane, and effective bee removal services. We relocate bees without harming them, protecting both your property and these vital pollinators.',
      image: beeOnFlower,
      alt: 'Bee on flower',
    },
    wideFeatures: true,
    features: [
      { icon: clockIcon, title: '24/7 Emergency', text: 'Available around the clock for urgent situations' },
      { icon: shieldIcon, title: 'Fully Insured', text: 'Insured for your peace of mind' },
      { icon: checkIcon, title: 'Humane Methods', text: 'Bees are safely relocated, not exterminated' },
      { icon: awardIcon, title: '8+ Years Experience', text: 'Trusted expertise in bee management' },
    ],
    process: {
      title: 'Our Removal Process',
      steps: [
        { title: 'Inspection', text: 'We assess the hive location, size, and best removal method for your situation.' },
        { title: 'Free Estimate', text: 'We provide a transparent, no-obligation quote with guaranteed pricing.' },
        { title: 'Safe Removal', text: 'We carefully remove and relocate the bees to a safe environment.' },
      ],
    },
    package: {
      heading: 'Removal Services',
      title: 'Bee Removal Services',
      price: 'On Request',
      items: [
        'Safe, humane bee relocation',
        '24/7 emergency service available',
        'All locations and hive sizes',
        'Free estimates',
      ],
    },
    cta: {
      title: 'Need Immediate Bee Removal?',
      text: 'Call us now for a free quote and same-day service',
    },
  },
  {
    id: 'pollination',
    label: 'Pollination Service',
    hero: {
      title: 'Pollination Services',
      text: 'Boost your crop yields with professional pollination services. Our healthy bee colonies ensure optimal pollination for farms, orchards, and agricultural operations.',
      image: pollinationImage,
      alt: 'Pollination',
    },
    features: [
      { icon: plantIcon, title: 'Healthy Colonies', text: 'Strong, treatment-free bee colonies for maximum efficiency.' },
      { icon: arrowIcon, title: 'Increased Yields', text: 'Up to 30% crop yield improvement with proper pollination.' },
      { icon: leafIcon, title: 'Chemical-Free Colonies', text: 'Healthy bees raised without chemical treatments.' },
      { icon: clockIcon, title: 'Flexible Scheduling', text: 'Hive placement timed to your crop bloom cycle.' },
    ],
    crops: {
      title: 'Crops We Pollinate',
      text: 'We provide pollination services for a wide variety of crops.',
      groups: [
        { title: 'Fruits', items: ['Apples & Pears', 'Peaches & Plums', 'Berries (all varieties)', 'Melons & Squash'] },
        { title: 'Vegetables', items: ['Cucumbers', 'Tomatoes', 'Peppers', 'Pumpkins & Gourds'] },
        { title: 'Specialty Crops', items: ['Almonds', 'Sunflowers', 'Clover (seed production)', 'Canola'] },
      ],
    },
    package: {
      heading: 'Pollination Packages',
      title: 'Pollination Services',
      price: 'On Request',
      items: [
        'Healthy bee colonies for maximum efficiency',
        'Flexible hive placement timed to crop bloom',
        'Custom quotes for all farm sizes',
      ],
    },
    cta: {
      title: 'Ready to Boost Your Crop Yields?',
      text: 'Contact us to discuss your pollination needs and get a custom quote.',
    },
  },
  {
    id: 'setup',
    label: 'Hive Setup & Management',
    hero: {
      title: 'Hive Setup & Management',
      text: 'Start your own beekeeping journey or let us manage hives on your property. We offer complete hive installation, mentorship, and ongoing maintenance.',
      image: hiveImage,
      alt: 'Hive Setup',
    },
    features: [
      { icon: awardIcon, title: 'Expert Guidance', text: 'Learn from seasoned beekeepers with years of experience.' },
      { icon: shieldIcon, title: 'Quality Equipment', text: 'We provide durable, high-quality woodenware and tools.' },
      { icon: checkIcon, title: 'Healthy Bees', text: 'Start with strong, locally-adapted nucs or packages.' },
      { icon: arrowIcon, title: 'Ongoing Support', text: 'Regular check-ins and maintenance services available.' },
    ],
    package: {
      heading: 'Setup & Mentorship Packages',
      title: 'Mentorship + Starter Hive Kit',
      price: 'On Request',
      items: [
        'Complete 1 hive setup',
        'Basic beekeeping tools',
        'Nucleus colony of bees',
        'Hands-on mentorship on bee care and setup',
      ],
    },
    cta: {
      title: 'Ready to Start Beekeeping?',
      text: 'Contact us to schedule a property consultation.',
    },
  },
]
