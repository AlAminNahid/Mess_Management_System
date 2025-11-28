import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('costs')
export class CostsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    mess_id: number;

    @Column({ type: 'int' })
    month: number;

    @Column({ type: 'int' })
    year: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    rent: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    internet: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    electricity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    maid: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    gas: number;
}
