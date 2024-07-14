import { $Enums, Category, ExpendableMaterial } from '@prisma/client'
import { IRepository, Meta } from '../../types/global.interfaces'
import {
  TCreateExpendableMaterial,
  TUpdateExpendableMaterial,
} from '../../validator/material.validator'

import { prisma } from '../../database/prisma'

export class ExpendableMaterialRepository
  implements
    IRepository<
      ExpendableMaterial,
      TCreateExpendableMaterial,
      TUpdateExpendableMaterial
    >
{
  async index(payload: {
    search?: string
    page: number
    perPage: number
    category?: string
    orderBy?: any
  }): Promise<Meta<ExpendableMaterial[]>> {
    const { page, perPage, search, orderBy } = payload
    const skip = (page - 1) * perPage

    const expendableMaterials = await prisma.expendableMaterial.findMany({
      take: perPage,
      skip: skip,
      where: search
        ? {
            AND: [
              { name: { contains: search, mode: 'insensitive' } },
              { deletedAt: null },
              { category: (payload.category as Category) || 'ENF' },
            ],
          }
        : {
            AND: [
              { deletedAt: null },
              { category: (payload.category as Category) || 'ENF' },
            ],
          },
      orderBy: JSON.parse(orderBy),
    })
    const total = await prisma.expendableMaterial.count({
      where: {
        AND: [
          { deletedAt: null },
          { category: (payload.category as Category) || 'ENF' },
        ],
      },
    })
    return {
      data: expendableMaterials,
      meta: {
        page,
        perPage,
        search,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async show(id: string): Promise<Meta<ExpendableMaterial>> {
    const expendableMaterial = await prisma.expendableMaterial.findUnique({
      where: { id },
    })
    return { data: expendableMaterial }
  }

  async create(
    payload: TCreateExpendableMaterial
  ): Promise<Meta<ExpendableMaterial>> {
    const expendableMaterial = await prisma.expendableMaterial.create({
      data: { ...payload, deletedAt: null },
    })
    return { data: expendableMaterial }
  }

  async update(
    id: string,
    payload: TUpdateExpendableMaterial
  ): Promise<Meta<ExpendableMaterial>> {
    const expendableMaterial = await prisma.expendableMaterial.update({
      where: { id },
      data: { ...payload },
    })
    return { data: expendableMaterial }
  }

  async softDelete(id: string): Promise<Meta<ExpendableMaterial>> {
    const expendableMaterial = await prisma.expendableMaterial.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
    return { data: expendableMaterial }
  }

  async destroy(id: string): Promise<Meta<ExpendableMaterial>> {
    const expendableMaterial = await prisma.expendableMaterial.delete({
      where: { id },
    })
    return { data: expendableMaterial }
  }
  async searchByName(name: string): Promise<Meta<ExpendableMaterial[]>> {
    const materials = await prisma.expendableMaterial.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
    })
    return { data: materials }
  }
}
