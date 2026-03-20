<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { BreadcrumbItem } from '@nuxt/ui'

// ==========================================
// 1. Tipagens (Pode mover para types/blog.ts)
// ==========================================
export interface BlogContentSection {
  title?: string
  paragraphs: string[]
  image?: string
  quote?: string
  paragraphsAfterQuote?: string[]
}

export interface RelatedPost {
  title: string
  slug: string
  readingTime: string
  image: string
}

export interface BlogPost {
  title: string
  slug: string
  description: string
  summary: string // O "Resumo do artigo" do card lateral
  date: string
  readingTime: string
  author: string
  coverImage: string
  categories: string[]
  content: BlogContentSection[]
}

const _route = useRoute()

// mock
const post: BlogPost = {
  title: 'Construção sem dores de cabeça: 7 pontos para planejar sua obra com mais segurança',
  slug: 'construcao-sem-dores-de-cabeca',
  description: 'Antes de começar uma reforma ou construção, algumas decisões fazem toda a diferença no prazo, no orçamento e na qualidade final. Reunimos os principais cuidados para transformar sua obra em uma experiência mais organizada e tranquila.',
  summary: 'Veja os cuidados mais importantes antes de iniciar sua obra: escopo, orçamento, cronograma, materiais, mão de obra e acompanhamento técnico.',
  date: '18 de março de 2026',
  readingTime: '6 min',
  author: 'Equipe SOS Construir',
  coverImage: '/images/blog/cover-2.jpg',
  categories: ['Construção', 'Reformas', 'Materiais', 'Acabamento', 'Planejamento'],
  content: [
    {
      title: '1. Defina o objetivo da obra com clareza',
      paragraphs: [
        'Toda obra começa muito antes do primeiro material chegar ao local. O primeiro passo é entender exatamente o que você quer resolver: ampliar um ambiente, modernizar acabamentos, melhorar a funcionalidade da casa ou construir do zero. Quando esse objetivo está bem definido, fica muito mais fácil tomar decisões coerentes ao longo do processo.',
        'Também vale listar prioridades. Em muitos casos, o cliente deseja fazer várias melhorias ao mesmo tempo, mas o orçamento ou o cronograma pedem etapas. Organizar o que é essencial, o que pode ser ajustado e o que pode esperar ajuda a reduzir retrabalho e manter o projeto sob controle.'
      ],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '2. Tenha um orçamento realista',
      paragraphs: [
        'Um orçamento bem construído não serve apenas para definir quanto será investido. Ele orienta escolhas, ajuda a comparar soluções e evita surpresas ao longo da execução. Para isso, é importante considerar materiais, mão de obra, transporte, taxas, acabamentos e uma margem de segurança para imprevistos.'
      ],
      quote: '"Obra organizada não é a mais barata no início — é a que evita desperdícios, atrasos e correções caras no final."',
      paragraphsAfterQuote: [
        'Ao trabalhar com uma equipe experiente, você ganha previsibilidade. Isso significa entender onde investir mais, onde simplificar e quais decisões trazem melhor custo-benefício sem comprometer qualidade e durabilidade.'
      ]
    },
    {
      title: '3. Escolha materiais certos para cada etapa',
      paragraphs: [
        'Nem sempre o produto mais conhecido é o mais adequado para o seu projeto. Em áreas molhadas, fachadas, instalações elétricas ou revestimentos de alto tráfego, a especificação correta impacta diretamente no desempenho da obra. Por isso, a seleção dos materiais deve conversar com o uso do ambiente, o clima, a manutenção e o resultado estético desejado.',
        'Além disso, parceiros confiáveis e fornecedores consistentes garantem melhor prazo de entrega, mais segurança no acabamento e menos perdas durante a execução.'
      ]
    },
    {
      title: '4. Conte com acompanhamento técnico',
      paragraphs: [
        'A presença de profissionais qualificados reduz riscos e melhora a tomada de decisão em cada fase da obra. Um acompanhamento técnico adequado organiza cronogramas, coordena equipes, acompanha qualidade e garante que tudo seja executado conforme o planejamento.',
        'Esse suporte também melhora a comunicação com o cliente. Em vez de acompanhar problemas, você acompanha progresso, etapas concluídas e próximos passos com mais clareza.'
      ]
    }
  ]
}

const relatedPosts: RelatedPost[] = [
  {
    title: 'Como escolher o acabamento ideal para cada ambiente',
    slug: 'escolher-acabamento-ideal',
    readingTime: '4 min',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=150&auto=format&fit=crop'
  },
  {
    title: 'Sinais de que sua instalação elétrica precisa de revisão',
    slug: 'revisao-instalacao-eletrica',
    readingTime: '5 min',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=150&auto=format&fit=crop'
  },
  {
    title: 'O que considerar antes de construir uma área de lazer',
    slug: 'construir-area-de-lazer',
    readingTime: '6 min',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=150&auto=format&fit=crop'
  }
]

// ==========================================
// 3. Lógica Auxiliar
// ==========================================
const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: post.title }
])

const scrollToContent = () => {
  const contentEl = document.getElementById('post-content')
  if (contentEl) {
    contentEl.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO Meta
useSeoMeta({
  title: `${post.title} | SOS Construir`,
  description: post.description,
  ogImage: post.coverImage
})
</script>

<template>
  <div class="min-h-screen bg-section-bg-1 pt-8 pb-20">
    <UContainer>
      <!-- Breadcrumb -->
      <div class="mb-8">
        <UBreadcrumb :items="breadcrumbItems" />
      </div>

      <!-- Grid Principal: Conteúdo (Esq) / Sidebar (Dir) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">

        <!-- COLUNA ESQUERDA: Artigo Principal -->
        <article class="lg:col-span-8">

          <!-- Cabeçalho do Post -->
          <header class="mb-10 flex flex-col gap-5">

            <h1 class="title-section">
              {{ post.title }}
            </h1>

            <p class="text-lg text-slate-500  leading-relaxed mb-2">
              {{ post.description }}
            </p>

            <div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <span class="flex items-center gap-2">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-orange-500" />
                {{ post.date }}
              </span>
              <span class="flex items-center gap-2">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-orange-500" />
                Leitura de {{ post.readingTime }}
              </span>
              <span class="flex items-center gap-2">
                <UIcon name="i-heroicons-user" class="w-4 h-4 text-orange-500" />
                {{ post.author }}
              </span>
            </div>
            <!-- Card resumo mobile -->
            <UCard class="flex lg:hidden bg-white border border-gray-200 ">
              <h3 class="font-bold text-blue-500 text-xl mb-4">Resumo do artigo</h3>
              <p class="text-slate-500 leading-relaxed mb-6">
                {{ post.summary }}
              </p>
              <button @click="scrollToContent"
                class="text-orange-500 font-bold  flex items-center gap-2 hover:text-orange-600 transition-colors">
                Ler conteúdo completo
                <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
              </button>
            </UCard>
          </header>

          <!-- Imagem de Capa -->
          <img :src="post.coverImage" :alt="post.title"
            class="w-full h-[400px] object-cover rounded-2xl mb-12 shadow-sm">

          <!-- Corpo do Artigo (Loop de Conteúdo) -->
          <div id="post-content" class="space-y-12">
            <section v-for="(section, index) in post.content" :key="index" class="space-y-6">

              <h2 v-if="section.title" class="title-section md:text-4xl text-blue-500">
                {{ section.title }}
              </h2>

              <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex"
                class="text-slate-500 leading-relaxed text-lg">
                {{ paragraph }}
              </p>

              <!-- Se a seção tiver uma imagem -->
              <img v-if="section.image" :src="section.image" :alt="section.title || 'Imagem do artigo'"
                class="w-full rounded-2xl shadow-sm my-8">

              <!-- Se a seção tiver uma citação de destaque (Blockquote) -->
              <blockquote v-if="section.quote"
                class="bg-[#EDF6FA]  border-l-orange-500 border-l-4 p-8 rounded-2xl my-8">
                <p class="text-xl font-medium text-blue-500 leading-tight text-center italic">
                  {{ section.quote }}
                </p>
              </blockquote>

              <!-- Parágrafos após a citação, se existirem (gambiarra útil para o seu modelo) -->
              <template v-if="(section as any).paragraphsAfterQuote">
                <p v-for="(paragraph, pIndex) in (section as any).paragraphsAfterQuote" :key="`after-${pIndex}`"
                  class="text-slate-500 leading-relaxed text-lg">
                  {{ paragraph }}
                </p>
              </template>

            </section>
          </div>

        </article>

        <!-- COLUNA DIREITA: Sidebar -->
        <aside class="lg:col-span-4 space-y-8">

          <!-- Card: Resumo desktop -->
          <UCard class="hidden lg:flex bg-white border border-gray-200">
            <h3 class="font-bold text-blue-500 text-xl mb-4">Resumo do artigo</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              {{ post.summary }}
            </p>
            <button @click="scrollToContent"
              class="text-orange-500 font-semibold text-sm flex items-center gap-2 hover:text-orange-600 transition-colors">
              Ler conteúdo completo
              <UIcon name="i-heroicons-arrow-down" class="w-4 h-4" />
            </button>
          </UCard>

          <!-- Card: Posts Relacionados -->
          <UCard class="bg-white border border-gray-200">
            <h3 class="font-bold text-blue-500 text-xl mb-6">Posts relacionados</h3>
            <div class="space-y-6">
              <NuxtLink v-for="related in relatedPosts" :key="related.slug" :to="`/blog/${related.slug}`"
                class="flex gap-4 group">
                <img :src="related.image" :alt="related.title"
                  class="w-23 h-24 object-cover rounded-lg shrink-0 group-hover:opacity-80 transition-opacity">
                <div class="flex flex-col justify-center">
                  <h4
                    class="font-semibold text-blue-500  leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                    {{ related.title }}
                  </h4>
                  <span class="text-xs text-gray-500 mt-1">Leitura de {{ related.readingTime }}</span>
                </div>
              </NuxtLink>
            </div>
          </UCard>

          <!-- Card: Categorias (Chips) -->
          <UCard class="bg-white border border-gray-200">
            <h3 class="font-bold text-blue-500 text-xl mb-6">Categorias</h3>
            <div class="flex flex-wrap gap-2">
              <NuxtLink v-for="cat in post.categories" :key="cat" :to="`/blog?categoria=${cat.toLowerCase()}`"
                class="px-4 py-2 bg-section-bg-1 hover:bg-orange-50 text-gray-600 hover:text-orange-600 text-sm font-semibold rounded-full transition-colors border border-gray-100">
                {{ cat }}
              </NuxtLink>
            </div>
          </UCard>

          <!-- Card: CTA WhatsApp -->
          <UCard class="bg-white border border-gray-200">
            <h3 class="font-bold text-blue-500 text-xl mb-3">Precisa de ajuda com seu projeto?</h3>
            <p class="text-gray-600  leading-relaxed mb-6">
              Nossa equipe pode orientar sua obra do planejamento ao acabamento final.
            </p>
            <UButton :to="DEFAULT_CTA_WHATSAPP_LINK" target="_blank" color="primary" block size="lg"
              class="font-bold shadow-md">
              Falar com especialista
            </UButton>
          </UCard>

        </aside>

      </div>
    </UContainer>
  </div>
</template>

<style scoped>
/* Ajuste fino para os blocos de texto não ficarem muito colados */
p+p {
  margin-top: 1.5rem;
}
</style>