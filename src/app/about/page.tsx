import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicShell } from '@/components/public-shell'
import { 
  ArrowRight,
  ArrowLeft, 
  CheckCircle2, 
  MessagesSquare, 
  FileText, 
  PenTool, 
  MonitorPlay, 
  GraduationCap,
  TrendingUp,
  MessageCircle,
  BarChart,
  HeartHandshake,
  Target,
  ArrowDown
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Fluenciel | French Language Academy',
}

const features = [
  { id: '01', title: 'We Stay With You Until Your First Exam Attempt', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: Target },
  { id: '02', title: 'Doubt-Solving Sessions', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: MessagesSquare },
  { id: '03', title: 'Mock Tests During the Course', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: FileText },
  { id: '04', title: 'Mock Tests & Support After Course Completion', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: GraduationCap },
  { id: '05', title: 'A Class Summary After Every Class', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: FileText },
  { id: '06', title: 'Assignments After Every Class', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: PenTool },
  { id: '07', title: 'Interactive Classes', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: MonitorPlay },
  { id: '08', title: 'French for Real Life + Exam Preparation', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: MessageCircle },
  { id: '09', title: 'Structured A1 → B2 Learning Journey', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: TrendingUp },
  { id: '10', title: 'Regular Practice and Feedback', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: CheckCircle2 },
  { id: '11', title: 'Progress Checks Throughout Your Journey', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: BarChart },
  { id: '12', title: 'Student-Centric Teaching', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: HeartHandshake },
  { id: '13', title: 'Exam-Focused When You Need It', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]', icon: Target },
]

export default function AboutPage() {
  return (
    <PublicShell>
      {/* A. HERO */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 text-center">
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-navy/60 hover:text-navy transition-colors bg-white/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-navy/5">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/60 px-4 py-1.5 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-widest text-navy/70">
              About Fluenciel
            </span>
          </div>
          
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl mx-auto max-w-4xl">
            Learn French. Build Confidence. Achieve Your Goal.
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-navy/65 sm:text-xl mx-auto max-w-2xl">
            Fluenciel focuses on practical French learning, exam preparation, structured progression and student support.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/courses" 
              className="inline-flex h-14 items-center justify-center rounded-full bg-navy px-8 text-[15px] font-semibold text-white transition-all hover:bg-navy/90 hover:scale-105"
            >
              Explore Courses
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex h-14 items-center justify-center rounded-full border border-navy/20 bg-white/50 backdrop-blur-md px-8 text-[15px] font-semibold text-navy transition-all hover:bg-white/80 hover:border-navy/40"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* B. ABOUT FLUENCIEL */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] border border-white/40 bg-white/80 p-8 shadow-sm backdrop-blur-md sm:p-14 text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl mb-8">About Fluenciel</h2>
            <div className="space-y-6 text-lg text-navy/70 leading-relaxed">
              <p>[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]</p>
            </div>
          </div>
        </div>
      </section>

      {/* C. WORD FROM OUR FOUNDERS */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative rounded-[2.5rem] bg-navy p-10 sm:p-16 text-center shadow-xl overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/brand/map-pattern.png')] bg-cover bg-center"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white">
                <MessagesSquare size={32} />
              </div>
              <blockquote className="text-2xl sm:text-3xl font-heading font-medium text-white leading-tight mb-8">
                &quot;We created Fluenciel because we wanted to build the kind of French-learning experience that students genuinely need...&quot;
              </blockquote>
              <div className="space-y-4 text-white/80 text-lg">
                <p>[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]</p>
              </div>
              <div className="mt-10">
                <p className="font-bold text-white tracking-wider uppercase text-sm">Founders, Fluenciel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. WHAT MAKES FLUENCIEL DIFFERENT? */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">What Makes Fluenciel Different?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.id} className="group rounded-[2rem] border border-white/60 bg-white/60 p-8 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-md hover:bg-white/90">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-4xl font-black text-navy/10 group-hover:text-studio/20 transition-colors">{feature.id}</span>
                  <div className="h-12 w-12 rounded-full bg-studio/10 flex items-center justify-center text-studio">
                    <feature.icon size={24} />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-4 leading-tight min-h-[3.5rem]">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-navy/65 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. COMPLETE LEARNING SUPPORT SYSTEM */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">Complete Learning Support System</h2>
          </div>
          
          <div className="rounded-[2.5rem] border border-white/40 bg-white/70 p-8 shadow-sm backdrop-blur-md sm:p-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              {[
                'Live Interactive Classes',
                'Class Summary After Every Class',
                'Assignments',
                'Doubt-Solving Support',
                'Regular Practice',
                'Mock Tests',
                'Feedback & Improvement'
              ].map((step, idx, arr) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <div className="flex-1 min-w-[120px] p-4 rounded-xl bg-white shadow-sm border border-navy/5 font-semibold text-navy text-sm">
                    {step}
                  </div>
                  {idx < arr.length - 1 && (
                    <ArrowDown className="text-studio md:-rotate-90 md:shrink-0" size={24} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* F. AFTER COURSE COMPLETION */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">After Course Completion</h2>
            <p className="mt-4 text-navy/60 text-sm max-w-xl mx-auto">
              *Continued support is subject to the applicable course terms.
            </p>
          </div>
          
          <div className="rounded-[2.5rem] border border-white/40 bg-white/70 p-8 shadow-sm backdrop-blur-md sm:p-14">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              {[
                'Course Duration Completed',
                'Continued Academic Support',
                'Doubt-Solving Sessions',
                'Mock Tests & Practice',
                'Further Improvement',
                'First Examination Attempt'
              ].map((step, idx, arr) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <div className="flex-1 min-w-[120px] p-4 rounded-xl bg-navy text-white shadow-sm font-semibold text-sm">
                    {step}
                  </div>
                  {idx < arr.length - 1 && (
                    <ArrowDown className="text-navy/40 md:-rotate-90 md:shrink-0" size={24} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* G. OUR APPROACH */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">Our Approach</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'LEARN', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]' },
              { title: 'PRACTISE', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]' },
              { title: 'REVIEW', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]' },
              { title: 'CLARIFY', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]' },
              { title: 'TEST', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]' },
              { title: 'IMPROVE', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]' },
              { title: 'PREPARE', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]' },
              { title: 'ATTEMPT', desc: '[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]' },
            ].map((step, idx) => (
              <div key={idx} className="rounded-2xl bg-white/60 p-6 border border-white shadow-sm text-center">
                <div className="text-studio font-black text-xl mb-3">{step.title}</div>
                <p className="text-[13px] text-navy/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H. OUR PROMISE */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] border border-studio/20 bg-studio/5 p-8 shadow-sm sm:p-14 text-center">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl mb-8">Our Promise</h2>
            
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                'Structured Learning',
                'Interactive Classes',
                'Class Summaries',
                'Assignments',
                'Doubt-Solving',
                'Mock Tests',
                'Feedback',
                'Continued Academic Support'
              ].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm border border-navy/5">
                  <CheckCircle2 size={16} className="text-studio" />
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-lg text-navy/70 leading-relaxed mb-8">
              <p>[INSERT EXACT CONTENT FROM SOURCE MATERIAL HERE]</p>
            </div>
            
            <h3 className="font-heading text-2xl font-bold text-navy mt-10">
              Your French journey doesn&apos;t end when the class ends.<br/>
              It continues with Fluenciel.
            </h3>
          </div>
        </div>
      </section>

      {/* I. FINAL CTA */}
      <section className="py-24 pb-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl mb-10">
            Ready to start your French journey?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/courses" 
              className="inline-flex h-14 items-center justify-center rounded-full bg-navy px-8 text-[15px] font-semibold text-white transition-all hover:bg-navy/90 hover:scale-105"
            >
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex h-14 items-center justify-center rounded-full border border-navy/20 bg-white/50 backdrop-blur-md px-8 text-[15px] font-semibold text-navy transition-all hover:bg-white/80 hover:border-navy/40"
            >
              Book Free Demo
            </Link>
          </div>
        </div>
      </section>

    </PublicShell>
  )
}
