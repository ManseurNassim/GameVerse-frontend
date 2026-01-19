import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0e0f10] text-white pt-20 pb-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
          À Propos de GameVerse
        </h1>
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
          Un projet portfolio démontrant les compétences en développement full-stack moderne.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        
        {/* Section 1: What is this */}
        <section className="bg-[#1c1e22] rounded-xl p-6 sm:p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-400 transition-colors duration-300">À Propos de ce Projet</h2>
          <p className="text-gray-300 leading-relaxed mb-4 transition-colors duration-300 hover:text-gray-200">
            GameVerse est un <span className="font-semibold text-blue-300">projet portfolio académique</span> conçu pour démontrer les compétences en développement web full-stack. Il explore les technologies modernes du développement frontend et backend, l'architecture d'applications, et les pratiques de déploiement en production.
          </p>
          <p className="text-gray-300 leading-relaxed transition-colors duration-300 hover:text-gray-200">
            Le projet s'appuie sur <span className="font-semibold text-blue-300">Rebirth</span>, un travail universitaire initial développé collectivement. GameVerse en représente l'aboutissement, intégrant une architecture complète, une authentification sécurisée, et un déploiement cloud professionnel.
          </p>
        </section>

        {/* Section 2: Objectives */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400 transition-colors duration-300">Objectifs du Projet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#1c1e22] rounded-lg p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 cursor-default">
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-blue-300 transition-colors duration-300">Techniquement</h3>
              <ul className="space-y-2 text-gray-400 transition-colors duration-300 text-sm">
                <li className="hover:text-gray-300 transition-colors duration-300">Démontrer la maîtrise des technologies modernes (React, Node.js, MongoDB)</li>
                <li className="hover:text-gray-300 transition-colors duration-300">Implémenter une architecture scalable et maintenable</li>
                <li className="hover:text-gray-300 transition-colors duration-300">Gérer l'authentification et la sécurité</li>
                <li className="hover:text-gray-300 transition-colors duration-300">Déployer sur l'infrastructure cloud</li>
              </ul>
            </div>
            <div className="bg-[#1c1e22] rounded-lg p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 cursor-default">
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-blue-300 transition-colors duration-300">Conceptuellement</h3>
              <ul className="space-y-2 text-gray-400 transition-colors duration-300 text-sm">
                <li className="hover:text-gray-300 transition-colors duration-300">Créer une interface utilisateur intuitive et responsive</li>
                <li className="hover:text-gray-300 transition-colors duration-300">Implémenter des filtres avancés et des recherches intelligentes</li>
                <li className="hover:text-gray-300 transition-colors duration-300">Optimiser les performances et l'expérience utilisateur</li>
                <li className="hover:text-gray-300 transition-colors duration-300">Documenter les bonnes pratiques</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Features */}
        <section className="bg-[#1c1e22] rounded-xl p-6 sm:p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400 transition-colors duration-300">Fonctionnalités Démontrées</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-4 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
              <div>
                <h4 className="font-semibold text-white mb-1 transition-colors duration-300 text-sm sm:text-base">Recherche et Filtrage Avancés</h4>
                <p className="text-gray-400 transition-colors duration-300 text-xs sm:text-sm">Implémentation de filtres multidimensionnels avec modes AND/OR, pagination et requêtes optimisées</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
              <div>
                <h4 className="font-semibold text-white mb-1 transition-colors duration-300 text-sm sm:text-base">Authentification Sécurisée</h4>
                <p className="text-gray-400 transition-colors duration-300 text-xs sm:text-sm">Système d'authentification JWT avec refresh tokens, hachage bcrypt et gestion de sessions</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
              <div>
                <h4 className="font-semibold text-white mb-1 transition-colors duration-300 text-sm sm:text-base">Gestion d'État et Context API</h4>
                <p className="text-gray-400 transition-colors duration-300 text-xs sm:text-sm">État applicatif centralisé avec React Context pour l'authentification et la gestion utilisateur</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
              <div>
                <h4 className="font-semibold text-white mb-1 transition-colors duration-300 text-sm sm:text-base">Interface Responsive</h4>
                <p className="text-gray-400 transition-colors duration-300 text-xs sm:text-sm">Design mobile-first avec Tailwind CSS, optimisé pour tous les appareils</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
              <div>
                <h4 className="font-semibold text-white mb-1 transition-colors duration-300 text-sm sm:text-base">Optimisation Performance</h4>
                <p className="text-gray-400 transition-colors duration-300 text-xs sm:text-sm">Lazy-loading, pagination intelligente, requêtes optimisées et feedback utilisateur immédiat</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
              <div>
                <h4 className="font-semibold text-white mb-1 transition-colors duration-300 text-sm sm:text-base">Déploiement Cloud</h4>
                <p className="text-gray-400 transition-colors duration-300 text-xs sm:text-sm">Configuration complète sur Vercel (frontend) et Render (backend) avec domaine personnalisé</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Tech Stack */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400 transition-colors duration-300">Technologies Utilisées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#1c1e22] rounded-lg p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 cursor-default">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-blue-300 transition-colors duration-300">Frontend</h3>
              <ul className="space-y-2 text-gray-400 transition-colors duration-300 text-xs sm:text-sm">
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>React 19</span> <span className="text-gray-500">UI moderne</span></li>
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>TypeScript</span> <span className="text-gray-500">Typage strict</span></li>
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>Tailwind CSS</span> <span className="text-gray-500">Styling</span></li>
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>Vite</span> <span className="text-gray-500">Bundler</span></li>
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>Axios</span> <span className="text-gray-500">HTTP client</span></li>
              </ul>
            </div>
            <div className="bg-[#1c1e22] rounded-lg p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 cursor-default">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-blue-300 transition-colors duration-300">Backend</h3>
              <ul className="space-y-2 text-gray-400 transition-colors duration-300 text-xs sm:text-sm">
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>Express.js</span> <span className="text-gray-500">API REST</span></li>
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>MongoDB</span> <span className="text-gray-500">Base de données</span></li>
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>JWT</span> <span className="text-gray-500">Authentification</span></li>
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>Bcrypt</span> <span className="text-gray-500">Sécurité</span></li>
                <li className="flex justify-between hover:text-gray-300 transition-colors duration-300"><span>Resend</span> <span className="text-gray-500">Email service</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Academic Context */}
        <section className="bg-[#1c1e22] rounded-xl p-6 sm:p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-400 transition-colors duration-300">Contexte Académique</h2>
          <p className="text-gray-300 leading-relaxed mb-4 transition-colors duration-300 hover:text-gray-200 text-sm sm:text-base">
            Ce projet trouve ses origines dans <span className="font-semibold text-blue-300">Rebirth</span>, un travail universitaire collectif réalisé à <span className="font-semibold text-blue-300">La Sorbonne Paris Nord</span>, à l'<span className="font-semibold text-blue-300">IUT de Villetaneuse</span>, répondant à un cahier des charges complet. Le projet initial couvrait la recherche multimodale, la gestion d'utilisateurs, l'authentification sécurisée et l'intégration de données externes.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4 transition-colors duration-300 hover:text-gray-200 text-sm sm:text-base">
            Les objectifs académiques incluaient :
          </p>
          <ul className="space-y-2 text-gray-400 ml-4 transition-colors duration-300 text-xs sm:text-sm">
            <li className="hover:text-gray-300 transition-colors duration-300">- Recherche et filtrage avancés par titre, genre, thème, plateforme</li>
            <li className="hover:text-gray-300 transition-colors duration-300">- Affichage détaillé des jeux avec métadonnées complètes</li>
            <li className="hover:text-gray-300 transition-colors duration-300">- Gestion complète des comptes utilisateurs</li>
            <li className="hover:text-gray-300 transition-colors duration-300">- Support multilingue (français/anglais)</li>
            <li className="hover:text-gray-300 transition-colors duration-300">- Architecture performante et sécurisée</li>
          </ul>
        </section>

        {/* Section 6: Evolution */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400 transition-colors duration-300">De Rebirth à GameVerse</h2>
          <div className="bg-[#1c1e22] rounded-xl p-6 sm:p-8 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
            <p className="text-gray-300 leading-relaxed mb-6 transition-colors duration-300 hover:text-gray-200 text-sm sm:text-base">
              GameVerse représente l'évolution et la production du projet initial. Les améliorations apportées incluent :
            </p>
            <div className="space-y-3 text-gray-400 text-xs sm:text-sm">
              <div className="flex items-start gap-3 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
                <p className="hover:text-gray-300 transition-colors duration-300"><span className="text-white font-semibold">Architecture modulaire</span> : Code refactorisé, séparation des responsabilités</p>
              </div>
              <div className="flex items-start gap-3 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
                <p className="hover:text-gray-300 transition-colors duration-300"><span className="text-white font-semibold">Déploiement production</span> : Vercel (frontend) et Render (backend)</p>
              </div>
              <div className="flex items-start gap-3 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
                <p className="hover:text-gray-300 transition-colors duration-300"><span className="text-white font-semibold">Domaine personnalisé</span> : gameverse.nassimmanseur.fr avec certificat SSL</p>
              </div>
              <div className="flex items-start gap-3 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
                <p className="hover:text-gray-300 transition-colors duration-300"><span className="text-white font-semibold">Service email robuste</span> : Intégration Resend avec domaine custom</p>
              </div>
              <div className="flex items-start gap-3 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
                <p className="hover:text-gray-300 transition-colors duration-300"><span className="text-white font-semibold">Optimisations UX</span> : Lazy-loading, spinner feedback, scroll immédiat</p>
              </div>
              <div className="flex items-start gap-3 pl-4 border-l-2 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:bg-blue-500/5 -ml-4 pl-6 py-2 rounded-r-lg">
                <p className="hover:text-gray-300 transition-colors duration-300"><span className="text-white font-semibold">Code quality</span> : Suppression du code mort, imports optimisés</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Team */}
        <section className="bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-xl p-6 sm:p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400 transition-colors duration-300">Équipe</h2>
          <p className="text-gray-300 leading-relaxed mb-6 transition-colors duration-300 hover:text-gray-200 text-sm sm:text-base">
            GameVerse est le fruit d'une collaboration universitaire et d'une mise en production minutieuse.
          </p>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-[#1c1e22] rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1">
              <h3 className="text-blue-300 font-semibold mb-2 text-sm sm:text-base transition-colors duration-300">Projet Initial - Rebirth</h3>
              <div className="text-gray-300 space-y-1 text-xs sm:text-sm transition-colors duration-300">
                <p className="hover:text-blue-300 transition-colors duration-300 cursor-default">Rodlens ABELARD</p>
                <p className="hover:text-blue-300 transition-colors duration-300 cursor-default">Michael ATICI</p>
                <p className="hover:text-blue-300 transition-colors duration-300 cursor-default">PHAM Xuan Hoang</p>
                <p className="hover:text-blue-300 transition-colors duration-300 cursor-default">Nassim MANSEUR</p>
              </div>
              <p className="text-gray-400 mt-3 text-xs transition-colors duration-300 hover:text-gray-300">Développement du projet académique initial, architecture de base et intégration des données</p>
            </div>

            <div className="bg-[#1c1e22] rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1">
              <h3 className="text-blue-300 font-semibold mb-2 text-sm sm:text-base transition-colors duration-300">Production et Optimisation</h3>
              <div className="text-gray-300 text-xs sm:text-sm transition-colors duration-300">
                <p className="hover:text-blue-300 transition-colors duration-300 cursor-default">Nassim MANSEUR</p>
              </div>
              <p className="text-gray-400 mt-3 text-xs transition-colors duration-300 hover:text-gray-300">Déploiement en production, optimisations frontend/backend, intégration email, configuration domaine et refactoring du code</p>
            </div>
          </div>
        </section>

        {/* Section 8: Code Source */}
        <section className="bg-[#1c1e22] rounded-xl p-6 sm:p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400 transition-colors duration-300">Code Source</h2>
          <p className="text-gray-300 leading-relaxed mb-6 transition-colors duration-300 hover:text-gray-200 text-sm sm:text-base">
            Le code source complet est disponible sur GitHub. N'hésitez pas à consulter les dépôts pour explorer l'architecture, la structure du code et les pratiques utilisées.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <a
              href="https://github.com/nassimmanseur/gameverse-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e0f10] rounded-lg p-6 border border-gray-700 hover:border-blue-400 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">Frontend</h3>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-xs sm:text-sm mb-3">React + TypeScript + Tailwind</p>
              <p className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-semibold text-xs sm:text-sm flex items-center gap-2">
                Voir le repo <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </p>
            </a>

            <a
              href="https://github.com/nassimmanseur/gameverse-backend"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e0f10] rounded-lg p-6 border border-gray-700 hover:border-blue-400 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">Backend</h3>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-xs sm:text-sm mb-3">Express + MongoDB + JWT</p>
              <p className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 font-semibold text-xs sm:text-sm flex items-center gap-2">
                Voir le repo <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </p>
            </a>
          </div>
        </section>

        {/* Section 9: Learning Outcomes */}
        <section className="bg-[#1c1e22] rounded-xl p-6 sm:p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-400 transition-colors duration-300">Apprentissages Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-blue-300 font-semibold mb-3 transition-colors duration-300 text-sm sm:text-base">Backend</h4>
              <ul className="space-y-2 text-gray-400 transition-colors duration-300 text-xs sm:text-sm">
                <li className="hover:text-gray-300 transition-colors duration-300">- Architecture RESTful et conception d'API</li>
                <li className="hover:text-gray-300 transition-colors duration-300">- Gestion de bases de données MongoDB</li>
                <li className="hover:text-gray-300 transition-colors duration-300">- Authentification JWT et gestion des sessions</li>
                <li className="hover:text-gray-300 transition-colors duration-300">- Requêtes optimisées et pagination</li>
                <li className="hover:text-gray-300 transition-colors duration-300">- Rate limiting et sécurité</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-300 font-semibold mb-3 transition-colors duration-300 text-sm sm:text-base">Frontend</h4>
              <ul className="space-y-2 text-gray-400 transition-colors duration-300 text-xs sm:text-sm">
                <li className="hover:text-gray-300 transition-colors duration-300">- Composants React et gestion d'état</li>
                <li className="hover:text-gray-300 transition-colors duration-300">- Optimisation de performance (lazy-loading)</li>
                <li className="hover:text-gray-300 transition-colors duration-300">- Design responsive avec Tailwind</li>
                <li className="hover:text-gray-300 transition-colors duration-300">- Gestion des erreurs et UX</li>
                <li className="hover:text-gray-300 transition-colors duration-300">- Intégration API et déploiement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center pt-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white transition-colors duration-300">Explorer le Projet</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/search"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 text-xs sm:text-base"
            >
              Voir la Recherche
            </Link>
            <Link
              to="/classement"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/50 active:scale-95 text-xs sm:text-base"
            >
              Voir les Classements
            </Link>
          </div>
        </section>
      </div>

      {/* Footer Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 sm:mt-20 pt-8 border-t border-gray-800 text-center text-gray-400 transition-colors duration-300">
        <p className="mb-2 text-xs sm:text-sm hover:text-gray-300 transition-colors duration-300">GameVerse - Projet Portfolio 2026</p>
        <p className="text-xs hover:text-gray-300 transition-colors duration-300">Un projet de démonstration des compétences en développement web full-stack</p>
      </div>
    </div>
  );
};

export default AboutPage;
