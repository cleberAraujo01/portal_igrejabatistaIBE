'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/lib/site';
import { IconMail } from '@/components/icons';

/**
 * ContactForm — formulario acessivel de contato.
 * -------------------------------------------------------------
 * Sem backend por padrao: ao enviar, monta um e-mail pre-preenchido
 * (mailto) para o endereco da igreja. Todos os campos tem <label>
 * associado, estados de erro com aria-describedby e foco gerenciado.
 *
 * PARA PRODUCAO: troque handleSubmit por uma Server Action ou por um
 * endpoint (ex.: Resend, Formspree). A marcacao acessivel ja esta pronta.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get('nome') || '').trim();
    const email = String(data.get('email') || '').trim();
    const mensagem = String(data.get('mensagem') || '').trim();

    const next: Record<string, string> = {};
    if (!nome) next.nome = 'Informe o seu nome.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = 'Informe um e-mail válido.';
    if (!mensagem) next.mensagem = 'Escreva a sua mensagem.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const assunto = encodeURIComponent(`Contato pelo site: ${nome}`);
    const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`);
    window.location.href = `mailto:${site.email}?subject=${assunto}&body=${corpo}`;
  }

  const field =
    'mt-2 w-full rounded-none border-b border-line bg-transparent pb-2 font-sans text-base text-ink outline-none transition-colors focus:border-emerald';

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div>
        <label htmlFor="nome" className="font-sans text-label uppercase text-muted">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'nome-erro' : undefined}
          className={field}
        />
        {errors.nome && (
          <p id="nome-erro" className="mt-2 font-sans text-sm text-emerald-deep">
            {errors.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="font-sans text-label uppercase text-muted">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-erro' : undefined}
          className={field}
        />
        {errors.email && (
          <p id="email-erro" className="mt-2 font-sans text-sm text-emerald-deep">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="mensagem" className="font-sans text-label uppercase text-muted">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          required
          aria-invalid={!!errors.mensagem}
          aria-describedby={errors.mensagem ? 'mensagem-erro' : undefined}
          className={`${field} resize-none`}
        />
        {errors.mensagem && (
          <p id="mensagem-erro" className="mt-2 font-sans text-sm text-emerald-deep">
            {errors.mensagem}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary w-fit">
        <IconMail className="h-5 w-5" />
        Enviar mensagem
      </button>
    </form>
  );
}
