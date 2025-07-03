"use client";

import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  loading: boolean;
  form: { title: string; category: string; favorite: boolean };
  setForm: React.Dispatch<React.SetStateAction<{ title: string; category: string; favorite: boolean }>>;
  onClose: () => void;
  onSave: () => void;
}

export default function PromptEditDialog({ open, loading, form, setForm, onClose, onSave }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Редактировать промпт</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) onSave();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="editTitle" className="block mb-1 font-semibold">
              Название
            </label>
            <Input id="editTitle" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required disabled={loading} />
          </div>

          <div>
            <label htmlFor="editCategory" className="block mb-1 font-semibold">
              Категория
            </label>
            <Input id="editCategory" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} disabled={loading} />
          </div>

          <div className="flex items-center space-x-2">
            <input id="editFavorite" type="checkbox" checked={form.favorite} onChange={(e) => setForm((f) => ({ ...f, favorite: e.target.checked }))} disabled={loading} />
            <label htmlFor="editFavorite" className="select-none">
              Избранное
            </label>
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Сохраняю..." : "Сохранить"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
