#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDmaDataDef {
    static constexpr std::uint8_t opcode = 0x50;
    static constexpr std::string_view name = "IT_DMA_DATA";
    static constexpr std::string_view desc = "CP DMA block memory transfer with cache invalidation options";
};
}
